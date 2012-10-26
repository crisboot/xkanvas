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
//Menus
var sMenu = {
    label: "xkanvas",
    name: "xkanvas",
    icon: "./img/logo.png",
    items: [{
        //submenu: true,//fijarse si tiene items
        label:"Application",
        name: "submenu1",
        icon: "./img/logo.png",
        items: [{
            label:"Calculator",
            name: "xkalc",
            icon: "./img/logo.png",
            onClick: function(){}
        },{
            label:"Console",
            name: "xkonsole",
            icon: "./img/ico-xfce-terminal.png",
            onClick: function(){}
        }]
    },{
        label:"Games",
        name: "game",
        icon: "./img/ico-xfce-terminal.png",
		onClick: function(){}
    },{
        label:"About",
        name: "about",
        icon: "./img/ico-xfce-terminal.png",
		onClick: function(){}
    }]
}

xk.buildMakeItem = function(){
	var item;
	
	return item;
}

xk.buildMainMenu = function(sMenu){
	var mainMenu = new Kinetic.Group(), menuItems = new Kinetic.Group(), x = 20, y = 15, 
	itemX = 0, itemY = 45, itemW = 150, itemH = 30, itemBoxY = 30, itemBoxW = 150, itemBoxChildY = 30, itemImageObj=[];
    
	var xkLabel = new Kinetic.Text({
		x: 20,
		y: 15,
		text: sMenu.label,
		alpha: 0.9,
		fontSize: 14,
		fontFamily: "Arial",
		textFill: "#d1d1d1",
		padding: 15,
		align: "left",
		verticalAlign: "middle",
		fontStyle: "normal"
	});

	var imageObj = new Image();
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
	imageObj.src = sMenu.icon;
    mainMenu.add(xkLabel);
	
	var grd = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#6d6b68");
    grd.addColorStop(0.03, "#595854");
    grd.addColorStop(0.1, "#3c3b37");
	
	//Add menu items
	for(var i=0; i<sMenu.items.length;i++){
		//console.log(sMenu.items[i].label)
	
		var itemBox = new Kinetic.Rect({
		  x: itemX,
		  y: (itemBoxY+itemH*i),
		  width: itemBoxW,
		  height: 30,
		  fill: grd,
		  stroke: "black",
		  strokeWidth: 1,
		  name: "topBar"
		});
		var itemLabel = new Kinetic.Text({
			x: itemX,
			y: (itemY+itemH*i),
			text: sMenu.items[i].label,
			alpha: 0.9,
			fontSize: 12,
			fontFamily: "Arial",
			textFill: "#d1d1d1",
			padding: 15,
			align: "left",
			verticalAlign: "middle",
			fontStyle: "normal"
		});
		menuItems.add(itemBox);
		menuItems.add(itemLabel);
		var itemImageObj = new Image();
		itemImageObj.onload = function() {	
			var pos = 400;
			for(var i in [1,2,3,4]){
				var itemImage = new Kinetic.Image({
					x: pos,
					y: (itemY+itemH*i),
					image: itemImageObj,
					width: 28,
					height: 28,
					ZIndex: 0
				});
				console.dir(itemImage);
				// add the shape to the layer
				mainMenu.add(itemImage);
				xk.desktopBar.draw();
				//xk.desktopCon.draw();
				// add the layer to the stage
				//xk.stage.add(layer);
				pos += 20;
			}
		};
		
		console.log((itemY+itemH*i));
		itemImageObj.src = sMenu.items[i].icon;
		console.log(sMenu.items[i].icon);
		itemBoxChildY += 30;
		
		if(typeof sMenu.items[i].items == "object"){
			//submenu
			itemBoxChildY = itemBoxY;
			for(var j=0; j<sMenu.items[i].items.length;j++){
				//console.log(sMenu.items[i].items[j].label)
				var itemBox = new Kinetic.Rect({
				  x: itemX+itemBoxW,
				  y: (itemBoxChildY+itemH*i),
				  // y: (itemBoxChildY+itemH*i+itemH*j),
				  width: itemBoxW,
				  height: 30,
				  fill: grd,
				  stroke: "black",
				  strokeWidth: 1,
				  name: "topBar"
				});
				
				var itemLabel = new Kinetic.Text({
					x: itemX+itemW,
					y: (itemY+itemH*i+itemH*j),
					text: sMenu.items[i].items[j].label,
					alpha: 0.9,
					fontSize: 12,
					fontFamily: "Arial",
					textFill: "#d1d1d1",
					padding: 15,
					align: "left",
					verticalAlign: "middle",
					fontStyle: "normal"
				});
				menuItems.add(itemBox);
				menuItems.add(itemLabel);
				
				itemBoxChildY += 30;
			}
		}
	}
	
	mainMenu.add(menuItems);
	
    mainMenu.on('click', function(){
		console.log(this);
		xk.buildMainMenu(sMenu);
		for(i in sMenu.items){
			console.log(sMenu.items[i]);
		}
		debugger;
        alert("show menu")
    });
	
	return mainMenu;
}

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

    var mainMenu = xk.buildMainMenu(sMenu);


    this.bar.add(box);
    this.bar.add(mainMenu);
	this.bar.add(clockLabel);
    return this.bar;
}

//ShortCut
xk.sicons = [];
xk.scut = function(id,label,imgName, x, y, handler){
    var rectX = x, rectY = y;
    var grp = new Kinetic.Group({draggable:true});
    
    var lbl = new Kinetic.Text({
        x: rectX,
        y: rectY+58,
		text: label||"Icon title",
		alpha: 0.9,
		fontSize: 10,
		fontFamily: "Arial",
		textFill: "#d1d1d1",
		padding: 10,
		align: "left",
		verticalAlign: "middle",
		fontStyle: "bold"
    });

	var imageIcon = new Kinetic.Image({
		x: rectX+14,
		y: rectY,
		width: 48,
		height: 48,
        name: id||"default",
		ZIndex: 0
    });

    grp.add(lbl);
    grp.add(imageIcon);
    grp.on("mouseover", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "pointer";
          layer.draw();
    });

    grp.on("mouseout", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "default";
          layer.draw();
    }); 

    grp.on("click", handler || function(){});

	xk.desktopCon.add(grp);
    
	var imageObj = new Image();
	imageObj.id = id||"default";
    xk.sicons[imageObj.id] = imageObj;
	imageObj.onload = function() {
	  /*var image = new Kinetic.Image({
		x: 15,
		y: 85,
		image: imageObj,
		width: 48,
		height: 48,
		ZIndex: 0
	  });*/
      var image = xk.desktopCon.get("."+this.id)[0];
	  image.setImage(xk.sicons[this.id]); 
	  // add the shape to the layer
	  //xk.desktopCon.add(image);
	  xk.desktopCon.draw();
	  // add the layer to the stage
	  //xk.stage.add(layer);
	}
	imageObj.src = imgName || "./img/ico-xfce-terminal.png";

	//xk.desktopCon.draw();
    return grp;
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
