(function () {
    'use strict';

    var initial = 50;

    // Unfold function.
    function unfold(callback, initialValue) {
        var output = [];
        var result;

        // Invoking callback function until it return false.
        do {
            result = callback(initialValue);
            if (result) {
                initialValue = result.newCondition;
                output.push(result);
            }
        } while (result);

        return output;
    }

    // Callback function.
    function multiplyByTwo(value) {
        if (value <= 100) {
            var newCondition = value + 5;
            var newValue = value * 2;
            return {
                newCondition: newCondition,
                newValue: newValue
            };
        } else {
            return false;
        }
    }

    // Checking function invocation result.
    console.log('Output array of objects:', unfold(multiplyByTwo, initial));

// Does ES5 has built-in alternative?
// No.
})();
