import sys
import tensorflow as tf

# Use MNIST handwriting dataset
mnist = tf.keras.datasets.mnist

# Prepare data for training
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train, x_test = x_train/255.0, x_test/255.0
y_train = tf.keras.utils.to_categorical(y_train)
y_test = tf.keras.utils.to_categorical(y_test)
x_train = x_train.reshape(
  x_train.shape[0], x_train.shape[1], x_train.shape[2], 1
)
x_test = x_test.reshape(
  x_test.shape[0], x_test.shape[1], x_test.shape[2], 1
)

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

# train
model.compile(
  optimizer="adam",
  loss="categorical_crossentropy",
  metrics=["accuracy"]
)
model.fit(x_train, y_train, epochs=10)

# evaluate
model.evaluate(x_test, y_test, verbose=2)

# save model to file:
if len(sys.argv) == 2:
    filename = sys.argv[1]
    model.save(filename)
    print(f"Model saved to {filename}.")