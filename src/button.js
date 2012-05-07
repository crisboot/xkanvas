/**
 * xKanvas Button
 * @class Button Class
 * @extends Object Class
 */
xk.btn = function(o){
    xk.obj.call(this,o);
};

xk.extend(xk.btn, xk.obj);

xk.btn.prototype = { 
	onClick: function(){
        alert("Clicked");
	}
}
