/**
 * xKanvas Base Object
 * @namespace xKanvas
 * @class Abstract Base Object Class
 * @constructor
 * @param {Object} o Configuration Object
 */
xk.obj = function(o){
    /**
     * Configuration Object
     * @property o
     * @type Object
     */
    this.o = o || {};
};
xk.obj.prototype = {
	// Due to this being a leaf, it doesn't use these methods,
    // but must implement them to count as implementing the
    // Composite interface
    add: function () { },
    remove: function () { },	
    getChild: function () { },
	
    clickeable: true,
    onClick: function(){
        throw new Error('Unsupported operation on an abstract class');
    },
    onMouseover: function(){
        document.body.style.cursor = "pointer";
    }
}
