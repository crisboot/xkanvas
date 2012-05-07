/**
 * xKanvas Window
 * @class Window Class
 * @extends conect Class
 */
xk.window = function(o){
    xk.con.call(this,o);
};

xk.extend(xk.window, xk.con);

xk.window.prototype = { 
	pane: new Kinetic.Layer(),
	addWin: function(win){
		this.pane.add(win);
	}
}