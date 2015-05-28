(function () {
    'use strict';

    var numbersArray = [1, 23, 2, 6, 12, 8, 14, 33, 42] ;

    // Filter function.
    function filter(sourceArray, callback) {
        var newArray = [];

        // Iterating over array passed to filter() function.
        sourceArray.forEach(function (item) {
            if (callback(item)) newArray.push(item);
        });

        return newArray;
    }

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

    // This function checks if given number is even.
    function checkIfEven(number) {
        return number % 2 === 0;
    }

    // This function summarizes two given numbers.
    function summarize(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }

    var evenNumbersArray = filter(numbersArray, checkIfEven);
    var reesult = fold(evenNumbersArray, summarize) / evenNumbersArray.length;
    console.log('Result of average of even numbers calculation:', reesult);

})();
