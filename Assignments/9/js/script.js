(function () {
    'use strict';

    var numbersArray = [17, 20, 45, -4, 2, -81, 99, 23, -42, 15];

    // Filter function.
    function filter(sourceArray, callback) {
        var newArray = [];

        // Iterating over array passed to filter() function.
        sourceArray.forEach(function (item) {
            if(callback(item)) newArray.push(item);
        });

        return newArray;
    }

    // Function checks if passed number is below zero.
    function checkBelowZero(number) {
        return number < 0;
    }

    // Function will return first array element that satisfies condition provided in callback.
    function firstMatchingelement(array, callback) {
        var filteredArray = filter(array, callback); // This could also be done using Array.prototype.filter()
        if (filteredArray.length > 0) {
            return filteredArray[0];
        } else {
            return 'Could not find appropriate items inside given array.';
        }
    }

    var result = firstMatchingelement(numbersArray, checkBelowZero);
    console.log('Matching element:', result);

})();
