define(function() {
    'use strict';

    /*
     * Default options for library.
     */

    var defaultLoggerName = '[Default Logger]';
    var defaultCustomLoggerName = '[Custom Logger]';
    var defaultDateFormat = 'full';
    var defaultTextColor = '#000000';

    /*
     * Handling uncaught exceptions.
     */

    window.onerror = function (errorMessage, url, line) {
        if (logger.logUncaughtExceptions) 
            outputWindow(
                defaultLoggerName,
                formatDateString(new Date(), defaultDateFormat),
                errorMessage + ', on line ' + line + ', here: ' + url);
        return false;
    };

    /*
     * Utility functions.
     */

    function formatDateString(dateObject, format) {
        var date;
        switch(format) {
            case 'full':
                date = dateObject.toString();
                return date;
            case 'short':
                date = dateObject.getHours() + ':' + dateObject.getMinutes() + ':' + dateObject.getSeconds();
                return date;
        }
    }

    /*
     * Common functions, that are used by both default and custom logger methods.
     */

    function outputConsole(name, date, message) {
        console.log(name + ' [' + date + ']: ' + message);
    }

    function outputAlert(name, date, message) {
        alert(name + ' [' + date + ']: ' + message);
    }

    function outputWindow(name, date, message, color) {
        var div = document.getElementById('custom-console');
        var messageContainer = document.createElement('DIV');
        messageContainer.innerHTML = name + ' [' + date + ']: ' + message;
        if (color) messageContainer.setAttribute('style', 'color: ' + color);
        div.appendChild(messageContainer);
    }

    function outputRemote(name, date, message) {
        var request = new XMLHttpRequest();
        var url = 'http://localhost:8080/somewhere';
        request.open('POST', url, true);
        request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        request.send(name + ' [' + date + ']: ' + message);
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                // Request response can be processed here.
                // Not doing this because this library is created in educational purposes.
            }
        };
    }

    /*
     * Custom logger constructor.
     */

    function LoggerConstructor(options) {
        this.name = (options && options.name) || defaultCustomLoggerName;
        this.dateFormat = (options && options.dateFormat) || defaultDateFormat;
        this.color = (options && options.color) || defaultTextColor;
    }

    LoggerConstructor.prototype.writeToConsole = function (message) {
        outputConsole(this.name, formatDateString(new Date(), this.dateFormat), message);
    };

    LoggerConstructor.prototype.writeToAlert = function (message) {
        outputAlert(this.name, formatDateString(new Date(), this.dateFormat), message);
    };

    LoggerConstructor.prototype.writeToWindow = function (message) {
        outputWindow(this.name, formatDateString(new Date(), this.dateFormat), message, this.color);
    };

    LoggerConstructor.prototype.writeToRemote = function (message) {
        outputRemote(this.name, formatDateString(new Date(), this.dateFormat), message);
    };

    /*
     * Event listener constructor.
     */

    function EventListener() {

    }

    /*
     * Public API
     */

    var logger = {

        logUncaughtExceptions: true,

        writeToConsole: function (message) {
            var date = new Date();
            outputConsole(defaultLoggerName, date, message);
        },

        writeToAlert: function (message) {
            var date = new Date();
            outputAlert(defaultLoggerName, date, message);
        },

        writeToWindow: function (message) {
            var date = new Date();
            outputWindow(defaultLoggerName, date, message);
        },

        writeToRemote: function (message) {
            var date = new Date();
            outputRemote(defaultLoggerName, date, message);
        },

        createLogger: function (options) {
            return new LoggerConstructor(options);
        },

        createEventListener: function (subscription, logger) {

        }

    };

    return logger;
});
