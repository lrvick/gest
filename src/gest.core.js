(function(root) {

    var gest = ( typeof require == 'function'
               && !( typeof define == 'function' && define.amd )
               ) ? require('../src/gest.core.js') : root.gest = {}

    var get = typeof require == 'function'
              && !(typeof define == 'function' && define.amd)
              && require('request')

    // ECMA-262 compatible Array#forEach polyfills
    Array.prototype.forEach = Array.prototype.forEach || function(fn, ctx) {
        var len = this.length >>> 0
        for (var i = 0; i < len; ++i){
            if (i in this){
                fn.call(ctx, this[i], i, this)
            }
        }
    }

    //ECMA-262 standard indexOf from Mozilla Developer Network
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (searchElement /*, fromIndex */ ) {
            "use strict"
            if (this === null) {
                throw new TypeError()
            }
            var t = Object(this)
            var len = t.length >>> 0
            if (len === 0) {
                return -1
            }
            var n = 0
            if (arguments.length > 0) {
                n = Number(arguments[1])
                if (isNaN(n)) { // shortcut for verifying if it's NaN
                    n = 0
                } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
                    n = (n > 0 || -1) * Math.floor(Math.abs(n))
                }
            }
            if (n >= len) {
                return -1
            }
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0)
            for (; k < len; k++) {
                if (k in t && t[k] === searchElement) {
                    return k
                }
            }
            return -1
        }
    }

    // Converts an object to an array
    function oc(a){
       var obj = {}
       for(var i=0;i<a.length;i++){
            obj[a[i]]=''
       }
       return obj
    }

    // Fills a template with data from an object
    function format(string, data) {
        "use strict"
        return string.replace(
            /\{\{(?:#(.+?)#)?\s*(.+?)\s*\}\}/g,
            function(m, cond, id) {
                var rv = data[id]
                if (rv === false){
                    return ''
                } else {
                    return rv? (cond || '') + rv : cond? m : ''
                }
            }
       )
    }

    // Exports data to the outside world
    gest.classifiers = {}
    gest.preprocessors = {}

    // Export gest for node/browser compatibilty
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = gest
    } else {
        root.gest = gest
    }

})(this)
