(function () {
    'use strict';

    var numbersArray = [1, 4, 9, 16, 25];

    // Map function.
    function map(sourceArray, callback) {
        var newArray = [];

        // Iterating over array passed to map() function.
        sourceArray.forEach(function (item) {
            newArray.push(callback(item));
        });

        return newArray;
    }

    // Callback function.
    function calculateRoot(number) {
        return Math.sqrt(number);
    }

    // Checking function invocation result.
    console.log(
        'Calculating Math.sqrt() for every item in provided array, returning new array:',
        map(numbersArray, calculateRoot)
    );

    // Does ES5 has built-in alternative?
    // Yes: Array.prototype.map()
    console.log(
        'Doing the same using Array.prototype.map():',
        numbersArray.map(calculateRoot)
    );

})();
