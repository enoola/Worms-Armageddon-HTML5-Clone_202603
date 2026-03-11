///<reference path="ServerSettings.ts"/>

declare var global: any;
// HACK
// Had to give up the benfits of types in this instance, as a problem with the way ES6 proposal module system
// works with Node.js modules. http://stackoverflow.com/questions/13444064/typescript-conditional-module-import-export
try {
    global.ServerSettings = require('./ServerSettings'); global.Util = require('util');

} catch (e) { }

module ServerUtilies {
    export function findByValue(needle, haystack, haystackProperity,) {

        for (var i = 0; i < haystack.length; i++) {
            if (haystack[i][haystackProperity] === needle) {
                return haystack[i];
            }
        }
        throw "Couldn't find object with proerpty " + haystackProperity + " equal to " + needle;
    }

    export function deleteFromCollection(collection, indexToRemove) {
        delete collection[indexToRemove];
        collection.splice(indexToRemove, 1);
    }

    export function createToken() {
        return Math.random().toString(36).substr(2);
    }


    export function info(io, message) {
        if (ServerSettings.DEVELOPMENT_MODE)
            console.log(Util.format("@ " + message));
    }

    export function warn(io, message) {
        if (Settings.DEVELOPMENT_MODE)
            console.warn(Util.format("@ " + message));
    }

    export function debug(io, message) {
        if (ServerSettings.DEVELOPMENT_MODE)
            console.debug(Util.format("@ " + message));
    }

    export function error(io, message) {
        if (ServerSettings.DEVELOPMENT_MODE)
            console.error(Util.format("@ " + message));
    }
}

//Hack
declare var exports: any;
if (typeof exports != 'undefined') {
    (module).exports = ServerUtilies;
}