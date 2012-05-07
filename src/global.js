/**
 * xKanvas Global Namespace
 * @namespace
 */
var xk = {};
/**
 * xKanvas Global Namespace
 * @property {String} Version
 */
xk.ver = 'XXversionXX';

xk.extend = function(obj1, obj2) {
        for(var key in obj2.prototype) {
            console.log(key)
            if(obj2.prototype.hasOwnProperty(key) && obj1.prototype[key] === undefined) {
                obj1.prototype[key] = obj2.prototype[key];
            }
        }
    }; 
