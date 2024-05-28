# Digit Recognition

This is a full-stack application that allows the users to draw digits on a canvas. The drawn digit is sent to a Flask server, which uses a TensorFlow neural network model to predict and return the digit.

## Table of Contents
- [Digit Recognition](#digit-recognition)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Technologies Used](#technologies-used)
    - [Frontend](#frontend)
    - [Backend](#backend)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Frontend Setup](#frontend-setup)
    - [Backend Setup](#backend-setup)
  - [Running the Application](#running-the-application)
    - [Frontend](#frontend-1)
    - [Backend](#backend-1)
    - [Accessing the Application](#accessing-the-application)
  - [Project Structure](#project-structure)
  - [Usage](#usage)
  - [Explenation](#explenation)
    - [FrontEnd](#frontend-2)
    - [Backend](#backend-2)

## Overview

The Digit Recognition Canvas App provides an interactive interface where users can draw digits. Once a digit is drawn, the app sends the image to a backend server, which processes the image and predicts the digit using a pre-trained neural network model.

## Technologies Used

### Frontend
- **Vite**: A build tool for frontend projects
- **TypeScript**: For type safety in JavaScript
- **Tailwind CSS**: For styling the application

### Backend
- **Flask**: A lightweight WSGI web application framework
- **Python**: The programming language for the backend logic
- **TensorFlow**: An open-source library for machine learning

## Setup and Installation

### Prerequisites
- Node.js and npm installed
- Python and pip installed
- Virtual environment tool (optional but recommended)

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the dependencies:
    ```bash
    npm install
    ```

### Backend Setup
1. Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```
3. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```

## Running the Application

### Frontend
1. Start the Vite development server:
    ```bash
    npm run dev
    ```

### Backend
1. Run the Flask server:
    ```bash
    flask --app predict.py run  
    ```

### Accessing the Application
Open your web browser and navigate to `http://localhost:**5173**` to access the application.

## Project Structure
```bash
  Neural-model/
  │
  ├── frontend/
  │ ├── public/
  │ ├── src/
  │ │ ├── style.css
  │ │ ├── canvas.ts
  │ │ ├── main.ts
  │ │ └── ...
  │ ├── index.html
  │ ├── package.json
  │ └── ...
  │
  ├── backend/
  │ ├── model.h5
  │ ├── neural.py
  │ ├── predict.py
  │ └── requirements.txt
  │
  ├── README.md
  └── ...
```

## Usage

1. Draw a digit on the canvas provided on the frontend interface.
2. Click the `Get Number` button to send the drawn digit to the backend server.
3. The server will process the image, predict the digit, and return the prediction which will be displayed on the frontend.

## Explenation
### FrontEnd
There are two ts files: 
- `main.ts`:  contains the logic that initialise the app and assigns different events to the html elements
- `canvas.ts`: contains all the canvas logic and the functions that handles the mouse even. more importantly the `predict` function will save the canvas to an image, then will call the `dataURLToBlob` function to convert that image into a Blob file that will be sent to the flask server. Once a response is received the function will then display the prediction onto the front end. 

### Backend
There are two python files:
 - `neural.py`: contains the code used to create the model. It will need one line argument when opened that is the name you want to give to the neural model when saved. The model is built using the built in mnist dataset from Keras, it initially divides the data into a testing set and a training set. It uses an initial convulational layer of 32 depth using a ReLu activation function, then proceeds to apply pooling. Once flattened the result there is a hidden layer of 128 depth and finally an output layer of 10 depth with a softMax activation function. The neural model is then tested and saved.
```python
 # Create convolutional network
  model = tf.keras.models.Sequential([
    # Convolutional layer with 32 filters and 3x3 kernel
    tf.keras.layers.Conv2D(32, (3, 3), activation="relu", input_shape=(28, 28, 1)),
    # Pooling layer
    tf.keras.layers.MaxPooling2D(pool_size=(2,2)),
    # Flatten result
    tf.keras.layers.Flatten(),
    # hidden layer with 128 depth and 0.5 of dropout
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dropout(0.5),
    # Output layer with softmax activation function
    tf.keras.layers.Dense(10, activation="softmax"),
])
  ```
 - `predict.py`: contains the flask server, it accepts only one route with a post request that needs a blob sent in the body. It will then call the function `resize_image_to_array` that will resize the blob to a shape (1, 28, 28, 1). It will then open the model.h5 file to predict the digit and return is as a json.
