/**
 * xKanvas Window
 * @class Window Class
 * @extends conect Class
 */
/*
xk.window = function(o){
    xk.con.call(this,o);
};

xk.extend(xk.window, xk.con);
*/
xk.window = function(o){ 
	var conf = {
		title: "Window Title",
		rectX: 100,
		rectY: 70
	};
	
	xk.override(conf, o || {});

    this.grp = new Kinetic.Group({
        x: 0,
        y: 0,
        draggable: true
    });
	
	var rectX = conf.rectX, rectY = conf.rectY;
	
	var txtTitle = new Kinetic.Text({
		x: rectX + 70,
		y: rectY + 15,
		text: conf.title,
		alpha: 0.9,
		fontSize: 12,
		fontFamily: "Arial",
		textFill: "#d1d1d1",
		padding: 10,
		align: "left",
		verticalAlign: "middle",
		fontStyle: "bold"
	});

    var grd = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#6d6b68");
    grd.addColorStop(0.03, "#595854");
    grd.addColorStop(0.1, "#3c3b37");

    var box = new Kinetic.Rect({
      x: rectX,
      y: rectY,
      width: 550,
      height: 350,
      cornerRadius: 5,
      fill: grd,
      stroke: "black",
      strokeWidth: 1,
      name: "box"
    });

	var grd2 = xk.desktop.getContext().createLinearGradient(0, 0, 0, 50);
	grd2.addColorStop(0, "#3c3b37");
	grd2.addColorStop(0.98, "#595854");
	grd2.addColorStop(1, "#6d6b68");

    var bgControlBtns = new Kinetic.Rect({
      x: rectX + 5,
      y: rectY + 5,
      width: 64,
      height: 20,
      cornerRadius: 10,
      fill: grd2
    });

    this.grp.add(box);
    this.grp.add(bgControlBtns);
    this.grp.add(new xk.btns.closeBtn({x:rectX,y:rectY}));
    this.grp.add(new xk.btns.roundMinBtn({x:rectX,y:rectY}));
    this.grp.add(new xk.btns.roundMaxBtn({x:rectX,y:rectY}));
    this.grp.add(txtTitle);

	return this.grp;
}
