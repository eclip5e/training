/*
 * 12. As a developer I want an ability to access the library through global variable, AMD module or CommonJS module.
 */
define(['./logger'], function(logger) {
    'use strict';

    /*
     * 1. As a developer I want to have an ability to log information.
     * 6. As a developer I want to have an ability to select from built-in logging methods.
     * 7. As a developer I want to be able to extend the library with custom logging methods.
     */

    var myLogger = logger.createLogger({
        name: 'My Custom Logger',
        dateFormat: 'short',
        color: '#ff0000'
    });

    /*
     * 2. As a developer I want to have an ability to send log information to the console.
     */

    myLogger.writeToConsole('Test log message.');

    /*
     * 3. As a developer I want to have an ability to send log information to an alert window.
     */

    myLogger.writeToAlert('This message should appear in alert window.');

    /*
     * 4. As a developer I want to have an ability to send log information to the current window.
     */

    myLogger.writeToWindow('Log message in the HTML log window');

    /*
     * 5. As a developer I want to have an ability to send log information to abstract Web API endpoint.
     */

    myLogger.writeToRemote('Sending this message to remote API for processing');

    /*
     * 8. As a developer I want to library to automatically log all unhandled client-side exceptions.
     */

    // Set to false by default.
    logger.logUncaughtExceptions = true;

    /*
     * 9. As a developer I want to have an ability to extend library with my own instrumentation methods
     * so that the library can monitor not only exceptions but other events too.
     */

    // Creating event listener instance.
    var myEventListener = logger.createEventListener({
        name: 'Test event listener',
        dateFormat: 'short',
        notificationType: 'window',
        color: 'blue'
    });

    // Trying create event with illegal name (integer).
    myEventListener.addEvent(12, 'console'); // => No event created, error message in the browser console.

    // Creating new event.
    myEventListener.addEvent('test-event', function () {
        console.log('Executing callback for event "test-event"');
    });

    // Trying to create duplicated event.
    myEventListener.addEvent('test-event'); // => No event created, error message in the browser console.

    // Trying to emit non-exsistant event.
    myEventListener.dispatchEvent('no-such-event'); // => No event dispatched, error message in the browser console.

    // Emitting event.
    myEventListener.dispatchEvent('test-event');

    // Removing non-existent event.
    myEventListener.removeEvent('no-such-event'); // => No event removed, error message in the browser console.

    // Removing previously created event.
    myEventListener.removeEvent('test-event');

    // Trying to emit removed event.
    myEventListener.dispatchEvent('test-event'); // => No event dispatched, error message in the browser console.

});
