/**
 * xKanvas Desktop
 * @class Desktop Class
 * @extends conect Class
 */
 /*
xk.desktop = function(o){
    xk.con.call(this,o);
};

xk.extend(xk.desktop, xk.con);

xk.desktop.prototype = { 
	pane: new Kinetic.Layer(),
	addWin: function(win){
		this.pane.add(win);
	}
}*/
xk.mainBar = function(){

    this.bar = new Kinetic.Group({
        x: 0,
        y: 0
    });

    var grd = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#6d6b68");
    grd.addColorStop(0.03, "#595854");
    grd.addColorStop(0.1, "#3c3b37");

    var box = new Kinetic.Rect({
      x: 0,
      y: 0,
      width: window.innerWidth || window.screen.width,
      height: 30,
      fill: grd,
      stroke: "black",
      strokeWidth: 1,
      name: "topBar"
    });
	
	var d = new Date(),
	h = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()),
	m = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()),
	s = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()),
	da = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()),
	mo = (d.getMonth() < 10 ? '0' + (d.getMonth() + 1): d.getMonth()),
	text = d.toString().substring(0,3) + ' ' + da + ' ' + d.toString().substring(4,7) + ', ' + h + ':' + m + ':' + s ;
	
	
	var clockLabel = new Kinetic.Text({
		x: window.innerWidth - 150,
		y: 15,
		text: text,
		alpha: 0.9,
		fontSize: 10,
		fontFamily: "Arial",
		textFill: "#d1d1d1",
		padding: 15,
		align: "left",
		verticalAlign: "middle",
		name: "mainClock",
		fontStyle: "normal"
	});

    var mainMenu = new Kinetic.Group();
    
	var xkLabel = new Kinetic.Text({
		x: 20,
		y: 15,
		text: "xkanvas",
		alpha: 0.9,
		fontSize: 14,
		fontFamily: "Arial",
		textFill: "#d1d1d1",
		padding: 15,
		align: "left",
		verticalAlign: "middle",
		fontStyle: "normal"
	});

	var imageObj = new Image({draggable: true});
	imageObj.onload = function() {
	  var image = new Kinetic.Image({
		x: 5,
		y: 0,
		image: imageObj,
		width: 28,
		height: 28,
		ZIndex: 0
	  });
	  
	  // add the shape to the layer
	  mainMenu.add(image);
	  xk.desktopBar.draw();
	  //xk.desktopCon.draw();
	  // add the layer to the stage
	  //xk.stage.add(layer);
	};
	imageObj.src = "./img/logo.png";
    mainMenu.add(xkLabel);
    mainMenu.add(xkLabel);


    this.bar.add(box);
    this.bar.add(mainMenu);
	this.bar.add(clockLabel);
    return this.bar;
}

//Namespace for apps
xk.apps = {};

xk.apps.init = function(){
	xk.apps.clock();
};

xk.apps.clock = function(name){
	setInterval(function(){
	var d = new Date(),
	h = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()),
	m = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()),
	s = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds()),
	da = (d.getDate() < 10 ? '0' + d.getDate() : d.getDate()),
	mo = (d.getMonth() < 10 ? '0' + (d.getMonth() + 1): d.getMonth()),
	text = d.toString().substring(0,3) + ' ' + da + ' ' + d.toString().substring(4,7) + ', ' + h + ':' + m + ':' + s ;
	//text = da + '-' + mo + '-' + d.getFullYear() + '   ' + h + ':' + m + ':' + s ;
	
	xk.desktopBar.get(".mainClock")[0].setText(text);
	xk.desktopBar.draw();
	},1000);
}
