(function () {
    'use strict';

    var array = [1, 3, 3, 4, 5];

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

    // Callback function.
    function multiply(previousValue, currentValue, index, array) {
        return previousValue * currentValue;
    }

    // Checking function invocation result.
    console.log('Array [' + array + '] items multiplication result:', fold(array, multiply));
    console.log('Array [' + array + '] items multiplication result, initial multiplier 10x:', fold(array, multiply, 10));

// Does ES5 has built-in alternative?
// Yes: Array.prototype.reduce()
})();
