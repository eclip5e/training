(function() {
    'use strict';

    // Function returns sum of all passed integers.
    function summarize() {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }

    // Partial application function.
    function partialApplication(fn) {
        // Referencing Array.prototype.slice() method.
        var slice = Array.prototype.slice;

        var argsArray = slice.call(arguments, 1);

        return function() {
            return fn.apply(this, argsArray.concat(slice.call(arguments, 0)));
        };
    }

    // Testing partial application function.
    var addHundred = partialApplication(summarize, 100);
    console.log("Passing multiple argumants to general (bound) function:", addHundred(1, 2, 3, 4, 5));

    // Testing partial application function.
    var addFiveHundreds = partialApplication(summarize, 100, 200, 200);
    console.log("Passing multiple arguments to partial application function also:", addFiveHundreds(5, 10, 15));

// Is there any JavaScript built-in alternative?
// No.
})();
