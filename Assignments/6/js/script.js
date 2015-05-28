(function () {
    'use strict';

    var numbersArray = [1, -4, 9, -16, 25, -50];

    // Filter function.
    function filter(sourceArray, callback) {
        var newArray = [];

        // Iterating over array passed to filter() function.
        sourceArray.forEach(function (item) {
            if(callback(item)) newArray.push(item);
        });

        return newArray;
    }

    // Callback function.
    function checkBelowZero(number) {
        return number < 0;
    }

    // Checking filter() function invocation result.
    console.log(
        'Filtering source array items, returning new array:',
        filter(numbersArray, checkBelowZero)
    );

    // Does ES5 has built-in alternative?
    // Yes: Array.prototype.filter()
    console.log(
        'Doing the same using Array.prototype.filter():',
        numbersArray.filter(checkBelowZero)
    );

})();
