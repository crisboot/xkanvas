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
        name: "application",
        icon: "./img/ico-applications.png",
		subMenuName: "submenu1",
        items: [{
            label:"Calculator",
            name: "xkalc",
            icon: "./img/ico-calculator.png",
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
        icon: "./img/ico-games.png",
		subMenuName: "submenu2",
        items: [{
            label:"Calculator 2",
            name: "xkalc2",
            icon: "./img/ico-calculator.png",
            onClick: function(){}
        },{
            label:"Console 2",
            name: "xkonsole2",
            icon: "./img/ico-xfce-terminal.png",
            onClick: function(){}
        }]
    },{
        label:"About",
        name: "about",
        icon: "./img/ico-about.png",
		onClick: function(){}
    }]
}

xk.buildMakeItem = function(){
	var item;
	
	return item;
}

xk.openMainMenu = function(){
	if(xk.desktopBar.get(".start-menu")[0].attrs.visible){
		xk.desktopBar.get(".start-menu")[0].hide();
	}else{
		xk.desktopBar.get(".start-menu")[0].show();
	}
}

xk.buildMainMenu = function(sMenu){
	var mainMenu = new Kinetic.Group(), menuItems = new Kinetic.Group({x:0, y:0, name: 'start-menu',visible: false}), x = 20, y = 15, 
	itemX = 0, itemY = 45, itemW = 150, itemH = 30, itemBoxY = 30, itemBoxW = 150,
	itemBoxChildY = 30, itemImageObj=[], itemChildImageObj=[], subMenuItems=[];
    
	var xkLabel = new Kinetic.Text({
		x: 20,
		y: 15,
		name: 'start-menu-launcher',
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
	xkLabel.on('click', function(){
		xk.openMainMenu();
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
    grd.addColorStop(0, "#3A3937");
    grd.addColorStop(1, "#3c3b37");

	var grdOrangered = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
    grdOrangered.addColorStop(0, "#F16C3A");
    grdOrangered.addColorStop(0.1, "#EB5821");
    grdOrangered.addColorStop(0.4, "#F84705");
    grdOrangered.addColorStop(1, "#F87240");
	
	//Add menu items
	for(var i=0; i<sMenu.items.length;i++){
		//console.log(sMenu.items[i].label)
	
		var itemBox = new Kinetic.Rect({
		  x: itemX,
		  y: (itemBoxY+itemH*i),
		  width: itemBoxW,
		  height: 30,
		  fill: grd,
		  //stroke: "black",
		  //strokeWidth: 1,
		  name: "menu-"+i
		});
        itemBox.on('mouseover', function(){
            this.attrs.fill = grdOrangered;    
        });
        itemBox.on('mouseout', function(){
            this.attrs.fill = "#3c3b37";    
        });

		var itemMenuLabel = new Kinetic.Text({
			x: itemX+25,
			y: (itemY+itemH*i),
			text: sMenu.items[i].label,
			alpha: 0.9,
			fontSize: 12,
			fontFamily: "Arial",
			textFill: "#d1d1d1",
			padding: 2,
			align: "left",
			verticalAlign: "middle",
			fontStyle: "normal",
		    name: "menu-label-"+i
		});
		// console.dir(itemMenuLabel);
		menuItems.add(itemBox);
		menuItems.add(itemMenuLabel);
		itemImageObj[i] = new Image();
		itemImageObj[i].orden = i;
		itemImageObj[i].ordenX = itemX;
		itemImageObj[i].ordenY = itemY+itemH*i;
		itemImageObj[i].onload = function() {	
			var itemImage = new Kinetic.Image({
				x: this.ordenX+2,
				y: this.ordenY-10,
				image: itemImageObj[this.orden],
				width: 20,
				height: 20,
				ZIndex: 0
			});
			// console.dir(itemImage);
			// add the shape to the layer
			menuItems.add(itemImage);
			xk.desktopBar.draw();
		};
		itemImageObj[i].src = sMenu.items[i].icon;

		itemBoxChildY += 30;
		
		//redefine array
		itemChildImageObj[i] = [];
		if(typeof sMenu.items[i].items == "object"){
			//submenu
			subMenuItems[i] = new Kinetic.Group({name: sMenu.items[i].subMenuName,visible: false});
			itemMenuLabel.subMenuName = sMenu.items[i].subMenuName;
			itemBox.subMenuName = sMenu.items[i].subMenuName;
			itemBoxChildY = itemBoxY;
			for(var j=0; j<sMenu.items[i].items.length;j++){
				//console.log(sMenu.items[i].items[j].label)
				var itemBoxChild = new Kinetic.Rect({
				  x: itemX+itemBoxW,
				  y: (itemBoxChildY+itemH*i),
				  // y: (itemBoxChildY+itemH*i+itemH*j),
				  width: itemBoxW,
				  height: 30,
				  fill: grd,
				  //stroke: "black",
				  //strokeWidth: 1,
				  name: "sub-menu-"+i+"-"+j
				});
                itemBoxChild.on('mouseover', function(){
                    this.attrs.fill = grdOrangered;    
                });
                itemBoxChild.on('mouseout', function(){
                    this.attrs.fill = "#3c3b37";    
                });
				
				var itemLabel = new Kinetic.Text({
					x: itemX+itemW+25,
					y: (itemY+itemH*i+itemH*j),
					text: sMenu.items[i].items[j].label,
					alpha: 0.9,
					fontSize: 12,
					fontFamily: "Arial",
					textFill: "#d1d1d1",
					padding: 2,
					align: "left",
					verticalAlign: "middle",
					fontStyle: "normal"
				});
				subMenuItems[i].add(itemBoxChild);
				subMenuItems[i].add(itemLabel);
				itemChildImageObj[i][j] = new Image();
				itemChildImageObj[i][j].ordenI = i;
				itemChildImageObj[i][j].ordenJ = j;
				itemChildImageObj[i][j].ordenX = itemX+itemW;
				itemChildImageObj[i][j].ordenY = itemY+itemH*i+itemH*j;
				itemChildImageObj[i][j].onload = function() {	
					var itemImage = new Kinetic.Image({
						x: this.ordenX+2,
						y: this.ordenY-10,
						image: itemChildImageObj[this.ordenI][this.ordenJ],
						width: 20,
						height: 20,
						ZIndex: 0
					});
					//console.dir(itemImage);
					//console.log(itemImage.attrs.y);
					// add the shape to the layer
					subMenuItems[this.ordenI].add(itemImage);
					xk.desktopBar.draw();
				};
				itemChildImageObj[i][j].src = sMenu.items[i].items[j].icon;
				
				
				itemBoxChildY += 30;
			}
			//add the submenu
			menuItems.add(subMenuItems[i]);
			
			itemMenuLabel.on('click', function() { 
				if(xk.desktopBar.get("."+this.subMenuName)[0].attrs.visible){
					xk.desktopBar.get("."+this.subMenuName)[0].hide();
				}else{
					for(a in sMenu.items){
						// console.log(sMenu.items[a]);
						if(typeof sMenu.items[a].items == "object" && sMenu.items[a].subMenuName != this.subMenuName){
							xk.desktopBar.get("."+sMenu.items[a].subMenuName)[0].hide();
						}
					}
					xk.desktopBar.get("."+this.subMenuName)[0].show();
					xk.desktopBar.get("."+this.subMenuName)[0].moveToTop();
				}
			});
			itemMenuLabel.on('mouseover', function() {
				// xk.desktopBar.get("."+this.subMenuName)[0].show();
			});
			itemMenuLabel.on('mouseout', function() {
				// xk.desktopBar.get("."+this.subMenuName)[0].hide();
			});
			// itemMenuLabel.on('mouseover', function() { alert("subme")
				// //console.log(this.subMenuName);
				// // console.log(sMenu.items[i].subMenuName);
				// // console.log(xk.desktopBar.get("."+sMenu.items[i].subMenuName)[0]);
				// //xk.desktopBar.get("."+this.subMenuName)[0].show();
			// });
		}
	}
	// Adding to main menu
	// mainMenu.add(menuItems);
	
    mainMenu.on('click', function(){
		// xk.openMainMenu();
		/*
		console.log(this);
		xk.desktopBar.get(".start-menu")[0].hide()
		// xk.buildMainMenu(sMenu);
		for(i in sMenu.items){
			console.log(sMenu.items[i]);
		}
		debugger;
        alert("show menu")
		*/
    });
	
	return [mainMenu,menuItems];
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
    this.bar.add(mainMenu[0]);
    this.bar.add(mainMenu[1]);
	this.bar.add(clockLabel);
    return this.bar;
}

//ShortCut
xk.sicons = [];
xk.scut = function(id,label,imgName, x, y, handler){
    var rectX = x, rectY = y;
    var grp = new Kinetic.Group({draggable:true});
    
    var lbl = new Kinetic.Text({
        x: rectX-4,
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
