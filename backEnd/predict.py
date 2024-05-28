import tensorflow as tf
import numpy as np

from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
IMG_SIZE = 28

def resize_image_to_array(image_path):
    # Open the image using PIL
    image = Image.open(image_path).convert('L')  # Convert to grayscale

    # Resize the image to 28x28
    image = image.resize((28, 28), Image.LANCZOS)

    # Convert the image to a NumPy array
    image_array = np.array(image)

    # Normalize the pixel values to the range [0, 1]
    image_array = image_array / 255.0

    # Reshape the array to the desired shape (1, 28, 28, 1)
    image_array = image_array.reshape((1, 28, 28, 1))

    return image_array

@app.route("/", methods=["POST"])
def predict():
    if 'image' not in request.files:
      print("No file part")
      return jsonify({"error": "No file part"}), 400
    
    file = request.files['image']
    if file.filename == '':
      print("No file selected")
      return jsonify({"error": "No selected file"}), 400
    
    print("passed checks")
    image = resize_image_to_array(file)
    model = tf.keras.models.load_model("model.h5")
    x = model.predict(image)
    prediction = str((x.argmax())) 
    print(x, prediction)
    return jsonify({"prediction": prediction})


