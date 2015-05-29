(function () {
    'use strict';

    // Function wraps text string in parenthesis.
    function parenthesisWrap(text) {
        return '(' + text + ')';
    }

    // Memoization function. Returns function that remembers results of it's initial evaluation.
    function memo(fn, param) {
        var result;
        return function () {
            if (result) {
                console.log('Returning cached result:');
                return result;
            } else {
                console.log('No cached result found, invoking passed in arguments function:');
                result = fn(param);
                return result;
            }
        }
    }

    // Creating and checking memoization function.
    var writeSomeText = memo(parenthesisWrap, 'Foo Bar');
    console.log(writeSomeText()); // First invocation => No cached result found, invoking passed in arguments function.
    console.log(writeSomeText()); // Second invocation => Returning cached result.

})();
