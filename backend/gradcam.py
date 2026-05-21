import numpy as np
import tensorflow as tf
import cv2
import base64

def get_gradcam_heatmap(model, img_array, last_conv_layer_name):
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )

    with tf.GradientTape() as tape:
        last_conv_layer_output, preds = grad_model(img_array)
        if preds.shape[1] == 1:
            class_channel = preds[:, 0]
        else:
            class_idx = np.argmax(preds[0])
            class_channel = preds[:, class_idx]

    grads = tape.gradient(class_channel, last_conv_layer_output)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))

    last_conv_layer_output = last_conv_layer_output[0]
    heatmap = last_conv_layer_output @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)

    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap)
    return heatmap.numpy()

def apply_heatmap(heatmap, original_img, alpha=0.4):
    # Rescale heatmap to a range 0-255
    heatmap = np.uint8(255 * heatmap)

    # Use jet colormap to colorize heatmap
    jet = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)
    
    # Resize jet heatmap to original image size
    jet = cv2.resize(jet, (original_img.shape[1], original_img.shape[0]))

    # Superimpose the heatmap on original image
    superimposed_img = jet * (1 - alpha) + original_img * alpha
    superimposed_img = np.clip(superimposed_img, 0, 255).astype("uint8")

    # Encode to base64
    _, buffer = cv2.imencode('.png', superimposed_img)
    img_base64 = base64.b64encode(buffer).decode('utf-8')
    
    return f"data:image/png;base64,{img_base64}"
