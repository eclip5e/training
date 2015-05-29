(function () {
    'use strict';

    // Fold function.
    function fold(array, callback, initialValue) {
        // Initialization. Defining initial values. Checking if initialValue is provided,
        // then deciding how we would iterate over array.
        var previousValue = array[0];
        var currentValue = array[1];
        var i = 1; // Array iteration start index.
        if (initialValue !== undefined) {
            previousValue = initialValue;
            currentValue = array[0];
            i = 0;
        }

        // Iterating over provided array.
        for (i; i < array.length; i++) {
            currentValue = array[i];
            previousValue = callback(previousValue, currentValue, i, array);
        }

        return previousValue;
    }

    // Unfold function.
    function unfold(callback, initialStateValue) {
        var output = [];
        var result;

        // Invoking callback function until it return false.
        do {
            result = callback(initialStateValue, 1, 100);
            if (result) {
                initialStateValue = result.newState;
                output.push(result.newValue);
            }
        } while (result);

        return output;
    }

    // This function summarizes two given numbers.
    function summarize(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }

    // Generate random number between min and max values, if passed condition value meets requirements.
    function getRandom(stateValue, min, max) {
        if (stateValue > 0) {
            return {
                newValue: Math.floor(Math.random() * (max - min)) + min,
                newState: stateValue - 1
            };
        } else {
            return false;
        }
    }

    // Using unfold() to generate array of 10 random numbers.
    var randomNumbersArray = unfold(getRandom, 10);
    // Using fold() to get sum of array items.
    console.log('Sum of 10 random numbers [' + randomNumbersArray + ']:', fold(randomNumbersArray, summarize));

})();
