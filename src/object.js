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
    clickeable: true,
    onClick: function(){
        throw new Error('Unsupported operation on an abstract class');
    },
    onMouseover: function(){
        document.body.style.cursor = "pointer";
    }
}
