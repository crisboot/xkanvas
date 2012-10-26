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
xk.trans = null; //transitions
xk.transVal = ["linear",
"ease-in",
"ease-out",
"ease-in-out",
"back-ease-in",
"back-ease-out",
"back-ease-in-out",
"elastic-ease-in",
"elastic-ease-out",
"elastic-ease-in-out",
"bounce-ease-out",
"bounce-ease-in",
"bounce-ease-in-out",
"strong-ease-in",
"strong-ease-out",
"strong-ease-in-out"];

xk.window = function(o){ 
	var conf = {
		title: "Window Title",
		rectX: 330,
		rectY: 170,
		width: 550,
		height: 350
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
    var grd = xk.desktop.getContext().createLinearGradient(0, rectY, 0, rectY+200);
    //var grd = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#6d6b68");
    grd.addColorStop(0.03, "#595854");
    grd.addColorStop(0.1, "#3c3b37");
/*
    var box = new Kinetic.Rect({
      x: rectX,
      y: rectY,
      width: conf.width,
      height: conf.height,
      cornerRadius: 5,
      fill: grd,
      stroke: "black",
      strokeWidth: 1,
      name: "box"
    });
*/
    var box = new Kinetic.Shape({
      drawFunc: function() {
        var context = this.getContext(),
        x = rectX, y = rectY,
        width = conf.width,
        height = conf.height,
        radius = 5;

        /*context.shadowColor = "black";
        context.shadowBlur=5;
        context.shadowOffsetX=5;
        context.shadowOffsetY=5;*/
        //context.globalAlpha = 0.8;
        context.beginPath();
        this.applyLineJoin();
        context.moveTo(x + radius, y);
        context.lineTo(x + width - radius, y);
        context.quadraticCurveTo(x + width, y, x + width, y + radius);
        context.lineTo(x + width, y + height - radius);
        context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        context.lineTo(x + radius, y + height);
        context.quadraticCurveTo(x, y + height, x, y + height - radius);
        context.lineTo(x, y + radius);
        context.quadraticCurveTo(x, y, x + radius, y);
        context.closePath();
        //context.fill(grdW);
        this.fillStroke();
        context.shadowColor = "#242424";
        context.shadowBlur = 10;
        context.shadowOffsetX = 2;
        context.shadowOffsetY = 2;
        context.fill();
      },
      fill: grd,
      stroke: "black",
      strokeWidth: 1,
      name: "box"
    });
	/* TODO: Add shadow
	var context = box.getContext();
	context.shadowColor = "#bbbbbb";
    context.shadowBlur = 20;
    context.shadowOffsetX = 15;
    context.shadowOffsetY = 15;
	*/
	
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
	
	var sepLine = new Kinetic.Line({
		points: [{x:rectX+0,y:rectY+30},{x:rectX+conf.width,y:rectY+30}],
		stroke: "#333",
		strokeWidth: 1,
		lineCap: 'round',
		lineJoin: 'round',
		name: "sepLine"
	});

    this.grp.add(box);
	//basic window header
    this.grp.add(bgControlBtns);
    this.grp.add(new xk.btns.closeBtn({x:rectX,y:rectY}));
    this.grp.add(new xk.btns.roundMinBtn({x:rectX,y:rectY}));
    this.grp.add(new xk.btns.roundMaxBtn({x:rectX,y:rectY}));
    this.grp.add(sepLine);
    this.grp.add(txtTitle);
	
	this.grp.on('click', function(){
		this.moveToTop();
		xk.desktop.draw();
	});
	
	this.grp.on("dragstart", function() {
		this.moveToTop();
		/*
		if(xk.trans) {
			xk.trans.stop();
		}
		this.moveToTop();
		this.setAttrs({
            shadow: {
              offset: {
                x: 15,
                y: 15
              }
            },
            scale: {
              x: .99,
              y: .9
            }
          });
		  */
		/*fun
		this.setAttrs({
            shadow: {
              offset: {
                x: 15,
                y: 15
              }
            },
            scale: {
              x: Math.random() * 1.2,
              y: Math.random() * 1.2
            }
          });*/
	});
	
	this.grp.on('dragend', function() {
		/*var randomFX = xk.transVal[Math.floor(Math.random()*11)];

		xk.log(randomFX);
		xk.trans = this.transitionTo({
            duration: 0.4,
            easing: randomFX,
            shadow: {
              offset: {
                x: 5,
                y: 5
              }
            },
            scale: {
              x: 1,
              y: 1
            }
         });
		*/
	});
	return this.grp;
}

