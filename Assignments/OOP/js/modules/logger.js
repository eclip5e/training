/*
 * Client-side logging library v1.0
 *
 * This library is created in test purposes. API documentation and usage examples can be found in 'app.js' file.
 */

define(function() {
    'use strict';

    /*
     * Default options for library.
     */

    var defaultCustomLoggerName = '[Logger]';
    var defaultEventListenerName = '[Event Listener]';
    var defaultDateFormat = 'full';
    var defaultTextColor = '#000000';

    /*
     * HTML console markup
     * ===================
     */

    var consoleHtml = [
        '<div class="custom-console" style="position: fixed; bottom: 10px; right: 10px; width: 500px;">',
        '    <div class="console-label" style="display: inline-block; top: -23px; left: -3px; padding: 0 5px; background-color: #cccccc; line-height: 20px;">Console:</div>',
        '    <div id="custom-console-content" style="height: 150px; background-color: #dddddd; padding: 5px; border: 3px solid #cccccc;"></div>',
        '</div>',
        ''
    ];

    // Appending console markup to the end of <body>.
    document.body.innerHTML += consoleHtml.reduce(function (previousString, currentString) {
        return previousString + currentString;
    });
    var HTMLConsole = document.getElementById('custom-console-content');

    /*
     * Handling uncaught exceptions
     * ============================
     */

    /*
     * Global JavaScript error handling.
     */
    window.onerror = function (errorMessage, url, line) {
        if (logger.logUncaughtExceptions) {
            var date = getCurrentDate(defaultDateFormat);
            console.log('[' + date + '] ' + errorMessage + ', on line ' + line + ', here: ' + url);
        }
        return false;
    };

    /*
     * Utility functions
     * =================
     */

    /*
     * Function for work with dates. Formats and returns current date in pre-defined format.
     *
     * @param {string} format Format name. Can be 'full' or 'short'.
     * @return {string} String containing rendered date ready for output.
     */
    function getCurrentDate(format) {
        var currentDate = new Date();
        var date;
        switch(format) {
            case 'short':
                date = currentDate.getHours() + ':' + currentDate.getMinutes() + ':' + currentDate.getSeconds();
                return date;
            default:
                date = currentDate.toString();
                return date;
        }
    }

    /*
     * Function creates and returns message string ready for output.
     *
     * @param {string} message Raw text message provided bu yser.
     * @param {string} dateFormat Date output format. Can be 'short' or 'full'.
     * @param {string} loggerName Name of the current logger instance.
     * @return {string} Rendered message ready for output.
     */
    function renderMessageString(message, dateFormat, loggerName) {
        var date = getCurrentDate(dateFormat);
        return loggerName + ' [' + date + ']: ' + message;
    }

    /*
     * Private functions
     * =================
     */

    /*
     * Function that raises JavaScript alert.
     *
     * @param {string} message Rendered message ready for output.
     */
    function printAlert(message) {
        alert(message);
    }

    /*
     * Function that outputs message to browser console.
     *
     * @param {string} message Rendered message ready for output.
     */
    function printConsole(message) {
        console.log(message);
    }

    /*
     * Function outputs message to HTML console.
     *
     * @param {string} message Rendered message ready for output.
     * @param {string} color Color for text in HTML console in any CSS-valid format.
     */
    function printWindow(message, color) {
        var messageContainer = document.createElement('DIV');
        messageContainer.innerHTML = message;
        if (color) messageContainer.setAttribute('style', 'color: ' + color);
        HTMLConsole.appendChild(messageContainer);
    }

    /*
     * Function outputs message to abstract web API endpoint.
     *
     * @param {string} message Rendered message ready for output.
     */
    function printRemote(message) {
        var request = new XMLHttpRequest();
        request.open('POST', 'http://localhost:8080/somewhere', true);
        request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        request.send(message);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                // Request response can be processed here.
                // Not doing this because this library is created in educational purposes.
            }
        };
    }

    /*
     * Custom logger constructor
     * =========================
     */

    /*
     * Constructor for Logger class.
     *
     * @param {object} options Object containing logger options.
     */
    function LoggerConstructor(options) {
        this.name = (options && options.name) || defaultCustomLoggerName;
        this.dateFormat = (options && options.dateFormat) || defaultDateFormat;
        this.color = (options && options.color) || defaultTextColor;
    }

    LoggerConstructor.prototype = {
        constructor: LoggerConstructor,

        /*
         * Outputs javascript alert window with given message.
         *
         * @param {string} message Text message for output.
         */
        writeToAlert: function (message) {
            if (message) {
                var renderedMessage = renderMessageString(message, this.dateFormat, this.name);
                printAlert(renderedMessage);
            } else {
                message = 'Nothing to alert. Please provide message for output.';
                printConsole(message);
            }
        },

        /*
         * Outputs message to the browser console.
         *
         * @param {string} message Text message for output.
         */
        writeToConsole: function (message) {
            if (message) {
                var renderedMessage = renderMessageString(message, this.dateFormat, this.name);
                printConsole(renderedMessage);
            } else {
                message = 'Please provide message for output.';
                printConsole(message);
            }
        },

        /*
         * Outputs given message to HTML console window.
         *
         * @param {string} message Text message for output.
         */
        writeToWindow: function (message) {
            if (message) {
                var renderedMessage = renderMessageString(message, this.dateFormat, this.name);
                printWindow(renderedMessage, this.color);
            } else {
                message = 'Nothing to output. Please provide message.';
                printConsole(message);
            }
        },

        /*
         * Sends given message to abstract web API endpoint.
         *
         * @param {string} message Text message for output.
         */
        writeToRemote: function (message) {
            if (message) {
                var renderedMessage = renderMessageString(message, this.dateFormat, this.name);
                printRemote(renderedMessage);
            } else {
                message = 'Nothing to send. Please provide message.';
                printConsole(message);
            }
        }
    };

    /*
     * Event listener constructor
     * ==========================
     */

    /*
     * Constructor for event listener class. Event listener supports callbacks, though
     * they are optional.
     */
    function EventListenerConstructor(options) {
        this.name = (options && options.name) || defaultEventListenerName;
        this.dateFormat = (options && options.dateFormat) || defaultDateFormat;
        this.color = (options && options.color) || defaultTextColor;
        this.notificationType = (options && options.notificationType) || 'console';

        // Array to contain events in current event listener instance.
        this.events = {};
    }

    /*
     * Adding event listener for specified event. Function checks if event with provided name
     * already exists. In that case no new event listener is created.
     *
     * @param {string} eventName Name of the event.
     * @param {function} callback Function that would be called when event occurs.
     * @return {Object} Current instance of EventListener for chaining.
     */
    EventListenerConstructor.prototype.addEvent = function (eventName, callback) {
        var message;

        // Checking if user-provided event name is string.
        if (typeof eventName !== 'string') {
            message = 'Please provide appropriate event name (string). No event created.';
            printConsole(message);
            return this;
        }

        // Checking if event already exist.
        if (!this.events.hasOwnProperty(eventName)) {
            this.events[eventName] = {
                callback: callback
            };
        } else {
            message = 'Event with that name already exist. No event created.';
            printConsole(message);
        }

        return this;
    };

    /*
     * Removing event listener.
     *
     * @param {string} eventName Name of the event to look for in event container object.
     * @return {Object} Current instance of EventListener for chaining.
     */
    EventListenerConstructor.prototype.removeEvent = function (eventName) {
        var message;

        // Checking if event exists.
        if (this.events.hasOwnProperty(eventName)) {
            delete this.events[eventName];
        } else {
            message = 'There is no such event. Nothing to remove.';
            printConsole(message);
        }
        
        return this;
    };

    /*
     * This method is for dispatching events.
     * It invokes callback function, if it was provided when event was created.
     *
     * @param {string} eventName Name of the event to dispatch.
     * @param {string} notificationType Type of message that would appear in case event occurs.
     * @return {Object} Current instance of EventListener for chaining.
     */
    EventListenerConstructor.prototype.dispatchEvent = function (eventName, notificationType) {
        var message;
        notificationType = notificationType || this.notificationType;

        // Checking if event exists.
        if (this.events.hasOwnProperty(eventName)) {

            var callback = this.events[eventName].callback;
            if (callback && typeof callback === 'function') this.events[eventName].callback.call(this);

            message = 'Event \'' + eventName + '\' occured.';
            var renderedMessage = renderMessageString(message, this.dateFormat, this.name);
            switch (notificationType) {
                case 'alert':
                    printAlert(renderedMessage);
                    break;
                case 'window':
                    printWindow(renderedMessage, this.color);
                    break;
                case 'remote':
                    printRemote(renderedMessage);
                    break;
                default:
                    printConsole(renderedMessage);
                    break;
            }
        
        } else {

            message = 'There is no such event. No event was dispatched.';
            printConsole(message);

        }

        return this;
    };

    /*
     * Public API
     * ==========
     */

    var logger = {
        logUncaughtExceptions: false,

        createLogger: function (options) {
            return new LoggerConstructor(options);
        },
        createEventListener: function (options) {
            return new EventListenerConstructor(options);
        }
    };

    return logger;
});
