/*
 * 12. As a developer I want an ability to access the library through global variable, AMD module or CommonJS module.
 */
define(['./logger'], function(logger) {
    'use strict';

    /*
     * 10. As a developer extending the library with my own logging or instrumentation methods I want
     *     to have established contracts in a form of base class of API documentation so that I can easily
     *     know how to extend the library.
     */

    // library is available as AMD module. It's main API provides two basic methods:
    // 
    //   createLogger([options]);
    //   createEventListener([options]);
    //
    // Each of them accepts options object which would apply for current instance of Logger or
    // Event Listener and return instance object. Options object is fully optional and can be ommitted.
    // 
    // Logger instance have the following methods available:
    //
    //   .writeToConsole(message);
    //
    // Below is example of usage for all available methods and options.

    /*
     * 1. As a developer I want to have an ability to log information.
     * 6. As a developer I want to have an ability to select from built-in logging methods.
     */

    var myLogger = logger.createLogger({
        name: 'My Custom Logger', // {string} Name of the current logger instance. Default is '[Logger]'.
        dateFormat: 'short', // {string} Date output format. Can be 'short' or 'full'. Default is 'full'.
        color: '#ff0000' // {string} Color for text in HTML console in any CSS-valid format. Default is '#000000'.
    });

    /*
     * 2. As a developer I want to have an ability to send log information to the console.
     */

    myLogger.writeToConsole('Test log message.'); // This method accepts string with message.

    /*
     * 3. As a developer I want to have an ability to send log information to an alert window.
     */

    myLogger.writeToAlert('This message should appear in alert window.'); // This method accepts string with message.

    /*
     * 4. As a developer I want to have an ability to send log information to the current window.
     */

    myLogger.writeToWindow('Log message in the HTML log window'); // This method accepts string with message.

    /*
     * 5. As a developer I want to have an ability to send log information to abstract Web API endpoint.
     */

    myLogger.writeToRemote('Sending this message to remote API for processing'); // This method accepts string with message.

    /*
     * 7. As a developer I want to be able to extend the library with custom logging methods.
     */

    // Declaring custom logger constructor function and inheriting logger methods.
    function CustomLoggerConstructor(options) {
        // Calling Logger constructor in context of current object, passing options object.
        logger.createLogger().constructor.call(this, options);
    }
    CustomLoggerConstructor.prototype = logger.createLogger();
    CustomLoggerConstructor.prototype.constructor = CustomLoggerConstructor;

    // Extending custom logger. Adding method that uses library-provided functionality.
    CustomLoggerConstructor.prototype.doubleLogging = function (message) {
        this.writeToWindow(message);
        this.writeToConsole(message);
    };

    // Creating custom logger instance and testing newly added method.
    var myExtendedLogger = new CustomLoggerConstructor({name: 'Extended Logger', dateFormat: 'short'});
    myExtendedLogger.doubleLogging('This message should appear in both console and window');

    /*
     * 8. As a developer I want to library to automatically log all unhandled client-side exceptions.
     */

    // Set to false by default.
    logger.logUncaughtExceptions = true;

    /*
     *  9. As a developer I want to have an ability to extend library with my own instrumentation methods
     *     so that the library can monitor not only exceptions but other events too.
     * 11. As a developer extending the library I want to see clear errors and warning in case if I 
     *     violate the contract of logging or instrumentation methods.
     */

    // Creating event listener instance.
    var myEventListener = logger.createEventListener({
        name: 'Test event listener', // {string} Name of the current logger instance. Default is '[Event Listener]'.
        dateFormat: 'short', // {string} Date output format. Can be 'short' or 'full'. Default is 'full'.

        notificationType: 'window', // {string} Default method for current Event Listener instance
                                    // for event occurence message output.
                                    // Can be 'alert', 'window', 'remote', and 'console'. Default is 'console'.

        color: 'blue' // {string} Color for text in HTML console in any CSS-valid format. Default is '#000000'.
    });

    // Trying to create event with illegal name (integer).
    myEventListener.addEvent(12); // => No event created, error message in the browser console.

    // Creating new event.
    myEventListener.addEvent(
        'test-event', // {string} Name of the new event.

        function () { // {function} Optional callback that whould be invoked upon event dispatchment.
            myLogger.writeToWindow('Executing callback for event "test-event"');
        }

    );

    // Trying to create duplicated event.
    myEventListener.addEvent('test-event'); // => No event created, error message in the browser console.

    // Trying to emit non-exsistant event.
    myEventListener.dispatchEvent('no-such-event'); // => No event dispatched, error message in the browser console.

    // Dispatching event.
    myEventListener.dispatchEvent('test-event');

    // Dispatching event. Overriding default (window) output method.
    myEventListener.dispatchEvent('test-event', 'console');

    // Trying to remove non-existent event.
    myEventListener.removeEvent('no-such-event'); // => No event removed, error message in the browser console.

    // Removing previously created event.
    myEventListener.removeEvent('test-event');

    // Trying to emit removed event.
    myEventListener.dispatchEvent('test-event'); // => No event dispatched, error message in the browser console.

});
