(function() {
    'use strict';

    function formString(x, y, z) {
        return x + ', ' + y + ', ' + z;
    }

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

})();