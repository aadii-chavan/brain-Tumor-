import numpy as np
from PIL import Image
import io

# SCALING CONSTANTS FROM THE MODEL'S PRUNED LAYERS (rescaling_2: 1/255, rescaling_3: [2.089, 2.112, 2.108])
SCALES = np.array([2.089, 2.112, 2.108])

def preprocess_image(image_bytes: bytes, target_size=(224, 224)):
    # Load image from bytes
    image = Image.open(io.BytesIO(image_bytes))
    
    # Convert to RGB if not already
    if image.mode != "RGB":
        image = image.convert("RGB")
    
    # Resize image
    image = image.resize(target_size)
    
    # Convert to numpy array
    img_array = np.array(image).astype('float32')
    
    # Original image for display (keep values in [0, 255])
    original_img = img_array.copy().astype('uint8')
    
    # Apply Pruning Math: (x / 255.0) * SCALES
    img_array = (img_array / 255.0) * SCALES
    
    # Expand dims for model input [1, 224, 224, 3]
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array, original_img
