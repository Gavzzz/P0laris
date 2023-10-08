function meanSquaredError(yTrue, yPred) {
    /*
    Calculate mean squared error between yPred and yTrue.

    Parameters:
    - yTrue (Array): Array of true values.
    - yPred (Array): Array of predictions.

    Returns:
    - The mean squared error value.
    */

    // Calculate the mean of squared errors
    let squaredErrors = [];

    for (let i = 0; i < yTrue.length; i++) {
        let error = yTrue[i] - yPred[i];
        squaredErrors.push(error * error);
    }

    let mse = squaredErrors.reduce((acc, val) => acc + val, 0) / squaredErrors.length;

    return mse;
}


function addBiasColumn(X) {
    /*
    Create a bias column and combine it with X.

    Parameters:
    - X (Array of Arrays): 2D array representing a feature matrix.

    Returns:
    - new_X (Array of Arrays): A 2D array with the first column consisting of all 1s.
    */

    // Get the number of rows in X
    let m = X.length;

    // Create a bias column (a column of all 1s)
    let biasColumn = Array.from({ length: m }, () => 1);

    // Combine the bias column with X
    let new_X = X.map((row, index) => [biasColumn[index], ...row]);

    return new_X;
}


function getBiasAndWeight(X, y, includeBias = true) {
    /*
    Calculate bias and weights that give the best-fitting line.

    Parameters:
    - X (Array of Arrays): 2D array representing a feature matrix.
    - y (Array): 1D array representing target values.
    - includeBias (boolean): Specify whether the model should include a bias term.

    Returns:
    - bias (number): If includeBias is true, return the bias constant. Otherwise, return 0.
    - weights (Array): An array representing the weight constants.
    */

    if (includeBias) {
        // Add a bias column if includeBias is true
        X = addBiasColumn(X);
    }

    // Calculate weights using the formula
    let X_T = transposeMatrix(X);
    let X_T_X = multiplyMatrices(X_T, X);
    let X_T_y = multiplyMatrices(X_T, [y]);
    let weights = multiplyMatrices(inverseMatrix(X_T_X), X_T_y);

    if (includeBias) {
        // Extract bias from the weights
        let bias = weights[0][0];
        // Remove the bias from the weights
        weights = weights.slice(1);
        return { bias, weights };
    } else {
        // If includeBias is false, set bias to 0
        return { bias: 0, weights };
    }
}

function addBiasColumn(X) {
    // Add a bias column (a column of all 1s)
    return X.map(row => [1, ...row]);
}

function transposeMatrix(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

function multiplyMatrices(matrix1, matrix2) {
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result[i] = [];
        for (let j = 0; j < matrix2[0].length; j++) {
            let sum = 0;
            for (let k = 0; k < matrix1[0].length; k++) {
                sum += matrix1[i][k] * matrix2[k][j];
            }
            result[i][j] = sum;
        }
    }
    return result;
}

const math = require('mathjs');

function inverseMatrix(matrix) {
    try {
        const inv = math.inv(matrix);
        return inv.toArray(); // Convert the result to a regular JavaScript array
    } catch (error) {
        console.error('Matrix inversion error:', error);
        return null; // Handle errors gracefully
    }
}

function getPredictionLinearRegression(X, y, includeBias = true) {
    /*
    Calculate the best fitting line.

    Parameters:
    - X (Array of Arrays): 2D array representing feature matrix.
    - y (Array): 1D array representing target values.
    - includeBias (boolean): Specify whether the model should include a bias term.

    Returns:
    - y_pred (Array): An array representing prediction values.
    */

    const { bias, weights } = getBiasAndWeight(X, y, includeBias);

    // Calculate predicted values
    const y_pred = [];

    for (let i = 0; i < X.length; i++) {
        let prediction = bias;
        for (let j = 0; j < weights.length; j++) {
            prediction += X[i][j] * weights[j];
        }
        y_pred.push(prediction);
    }

    return y_pred;
}


const area = [/* your X values as an array */];
const predicted = [/* your predicted values as an array */];
const y = [/* your y values as an array */];

const ctx = document.getElementById('scatterPlot').getContext('2d');

// Create a scatter plot
const scatterPlot = new Chart(ctx, {
    type: 'scatter',
    data: {
        datasets: [{
            label: 'Scatter Plot',
            data: area.map((value, index) => ({ x: value, y: y[index] })),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            pointRadius: 5,
            pointHoverRadius: 10,
        }],
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Size in square meter',
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Price in SGD',
                },
            },
        },
    },
});

// Create a line plot
const linePlot = new Chart(ctx, {
    type: 'line',
    data: {
        labels: area,
        datasets: [{
            label: 'Line Plot',
            data: predicted,
            borderColor: 'rgba(255, 0, 0, 1)',
            borderWidth: 2,
            fill: false,
        }],
    },
    options: {
        scales: {
            x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Size in square meter',
                },
            },
            y: {
                type: 'linear',
                position: 'left',
                title: {
                    display: true,
                    text: 'Price in SGD',
                },
            },
        },
    },
});


<html>
<head>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <canvas id="scatterPlot"></canvas>
    <script src="your-script.js"></script>
</body>
</html>