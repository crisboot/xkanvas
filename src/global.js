/**
 * xKanvas Global Namespace
 * @module xKanvas
 */
var xk = {};
/*
 * xKanvas Version
 * @property ver
 * @type string
 */
xk.ver = 'XXversionXX';

/*
 * xKanvas Extend utility
 * @namespace xKanvas
 * @method Extend
 * @param {Object} obj1 Child Class Object
 * @param {Object} obj2 Parent Class Object
 */
xk.extend = function(obj1, obj2) {
    for(var key in obj2.prototype) {
        if(obj2.prototype.hasOwnProperty(key) && obj1.prototype[key] === undefined) {
            obj1.prototype[key] = obj2.prototype[key];
        }
    }
}

xk.override = function(obj1, obj2) {
    for(var key in obj2) {
            obj1[key] = obj2[key];
    }
}

/*
	http://james.padolsey.com/javascript/get-document-height-cross-browser/
*/
xk.getDocHeight = function() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}


xk.stage = {};
xk.desktop = {};

xk.init = function(o){

	var obj = {
		container: "container",
		width: window.innerWidth || window.screen.width,
		height: xk.getDocHeight() || window.screen.height
	}
	xk.extend(obj, o);
	
	xk.stage = new Kinetic.Stage({
		container: obj.container,
		width: obj.width,
		height: obj.height
	});

    xk.desktop  = new Kinetic.Layer();
}

xk.render = function(o){
    xk.stage.add(xk.desktop)
}
