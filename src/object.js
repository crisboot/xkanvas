/**
 * xKanvas Base Object
 * @class Abstract Base Object Class
 */
xk.obj = function(o){
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
