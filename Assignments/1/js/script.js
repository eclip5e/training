(function() {
    'use strict';

    function summarize() {
        var sum = 0;
        for (var i = 0; i < arguments.length; i++) {
            sum += arguments[i];
        }
        return sum;
    }

    function partialApplication(fn) {

        var argsArray = Array.prototype.slice.call(arguments, 1);

        return function() {
            return fn.apply(this, argsArray.concat(Array.prototype.slice.call(arguments, 0)));
        };
    }

    var addHundred = partialApplication(summarize, 100);
    console.log("Passing multiple argumants to general (bound) function:", addHundred(1, 2, 3, 4, 5));

    var addFiveHundreds = partialApplication(summarize, 100, 200, 200);
    console.log("Passing multiple arguments to partial application function also:", addFiveHundreds(5, 10, 15));

})();