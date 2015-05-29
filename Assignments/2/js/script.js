(function() {
    'use strict';

    // function returns string formed from passed arguments.
    function formString(x, y, z) {
        return x + ', ' + y + ', ' + z;
    }

    // Currying function.
    function curry(fn) {
        var argumentsNumber = fn.length;

        function curriedFunction(oldArgs) {
            return function(newArg) {
                var args = oldArgs.concat(newArg);
                if (args.length < argumentsNumber) {
                    return curriedFunction(args);
                } else {
                    return fn.apply(this, args);
                }
            }
        }

        return curriedFunction([]);
    }

    // Normal function invocation:
    console.log(formString('a', 'b', 'c'));

    // Using currying.
    var curriedFormString = curry(formString);
    console.log(curriedFormString('x')('y')('z'));

// How is it differ from Partial Application?
// Accepts arguments one per invocation.
// Base function (formString() in current case) will not be invoked untill all arguments are supplied.
})();
