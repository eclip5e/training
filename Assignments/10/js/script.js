(function () {
    'use strict';

    // Function outputs in console passed text string.
    function logTextMessage(text) {
        console.log(text);
    }

    // Summarizing two provided integers.
    function addTwoNumbers(a, b) {
        console.log(a + b);
    }

    // Lazy evaluation function. It returns function with arguments already bound to it, but not invoking this function.
    function lazify(fn) {
        return fn.bind.apply(fn, arguments);
    }

    // Lazy evaluating text output.
    var logFooBar = lazify(logTextMessage, 'Foo Bar');
    logFooBar();

    // Lazy evaluating addition function.
    var sumOneTwo = lazify(addTwoNumbers, 1, 2);
    sumOneTwo();

})();
