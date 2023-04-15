__Machine learning__
```python
import numpy as np
from sklearn.linear_model import LogisticRegression

# Define training data
X_train = np.array([[0, 0], [1, 1], [1, 0], [0, 1]])
y_train = np.array([0, 1, 1, 0])

# Initialize logistic regression model
model = LogisticRegression()

# Train model on training data
model.fit(X_train, y_train)

# Define test data
X_test = np.array([[0, 0], [1, 0], [0, 1], [1, 1]])

# Use trained model to make predictions on test data
y_pred = model.predict(X_test)

# Print predictions
print(y_pred)
```
In this example, we first define some training data and labels. The training data consists of four two-dimensional points, and the labels indicate whether each point belongs to class 0 or class 1.

We then initialize a logistic regression model using the scikit-learn LogisticRegression class, and train the model on the training data using the fit method.

Finally, we define some test data and use the trained model to make predictions on the test data using the predict method. The predicted labels are stored in y_pred and printed to the console.

This is a very simple example, but logistic regression is a powerful machine learning algorithm that can be used for a wide range of classification tasks. By changing the training data and labels, you can use this code as a starting point for many different types of machine learning problems.

_fredrik (at) conva se_
