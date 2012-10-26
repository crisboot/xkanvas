/**     _  __                         
* __  _| |/ /__ _ _ ____   ____ _ ___ 
* \ \/ / ' // _` | '_ \ \ / / _` / __|
*  >  <| . \ (_| | | | \ V / (_| \__ \
* /_/\_\_|\_\__,_|_| |_|\_/ \__,_|___/
* 
* xKanvas Javascript Library 
*  
* @description xKanvas is a set of desktoping widgets running inside a canvas html element
* @demo http://cortezcristian.com.ar/xkanvas/
* @license Released under GPL v2 License - http://www.gnu.org/licenses/gpl-2.0.html
* @author Cristian Ariel Cortez  
* @copyright (c) 2012 - 2014 Cristian Ariel Cortez - cortez[dot]cristian[at]gmail[dot]com - http://cortezcristian.com.ar/
* @date Oct 26 2012
* @version 1.0
* @requires KineticJS v3.9.4 or above - http://www.kineticjs.com/
*
* This program is free software; you can redistribute it and/or
* modify it under the terms of the GNU General Public License
* as published by the Free Software Foundation; either version 2
* of the License, or (at your option) any later version.
* 
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
* 
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/                                    

/**
 * xKanvas Global Namespace
 * @module xKanvas
 */
var xk = {};
/*
 * xKanvas Version
 * @property ver
 * @type string
 */
xk.ver = '1.0';

/*
 * xKanvas Extend utility
 * @namespace xKanvas
 * @method Extend
 * @param {Object} obj1 Child Class Object
 * @param {Object} obj2 Parent Class Object
 */
xk.extend = function(obj1, obj2) {
    for(var key in obj2.prototype) {
        if(obj2.prototype.hasOwnProperty(key) && obj1.prototype[key] === undefined) {
            obj1.prototype[key] = obj2.prototype[key];
        }
    }
}

xk.override = function(obj1, obj2) {
    for(var key in obj2) {
            obj1[key] = obj2[key];
    }
}

xk.log = function(a){try{console.log(a);} catch(e) {}};

/*
	http://james.padolsey.com/javascript/get-document-height-cross-browser/
*/
xk.getDocHeight = function() {
    var D = document;
    return Math.max(
        Math.max(D.body.scrollHeight, D.documentElement.scrollHeight),
        Math.max(D.body.offsetHeight, D.documentElement.offsetHeight),
        Math.max(D.body.clientHeight, D.documentElement.clientHeight)
    );
}


xk.stage = {};
xk.desktop = {};
xk.desktopBar = {};
xk.desktopCon = {};

xk.init = function(o){
	//TODO: add right click support: document.oncontextmenu = function(e) {alert("a"); return false;} 
	var obj = {
		container: "container",
		width: window.innerWidth || window.screen.width,
		height: xk.getDocHeight() || window.screen.height
	}
	xk.extend(obj, o);
	
	xk.stage = new Kinetic.Stage({
		container: obj.container,
		width: obj.width,
		height: obj.height
	});

    xk.desktop  = new Kinetic.Layer({y:30});
    xk.desktopCon  = new Kinetic.Layer({y:30}); /*Desktop icons container*/
    xk.desktopBar  = new Kinetic.Layer();
	//init apps
	xk.apps.init();
	
	/*var imageObj = new Image();
	imageObj.onload = function() {
	  var image = new Kinetic.Image({
		x: 15,
		y: 35,
		image: imageObj,
		width: 48,
		height: 48,
		ZIndex: 0
	  });
	  
	  // add the shape to the layer
	  xk.desktopCon.add(image);
	  xk.desktopCon.draw();
	  // add the layer to the stage
	  //xk.stage.add(layer);
	}
	imageObj.src = "./img/ico-xfce-terminal.png";
    */
    xk.scut("terminal","Terminal", "./img/ico-xfce-terminal.png", 15, 35, function(){
        var xTerm = new xk.window({title: "crisboot@xkanvas: ~$", rectX:220});
        xk.desktop.add(xTerm);
        xk.desktop.draw();
        });
	/*
	imageObj.on('click', function(){
		var xWindow3 = new xk.window({rectX: 60,rectY: 270});
		xk.desktop.add(xWindow3);
	});*/
	
}

xk.render = function(o){
	
	//adding stuff
	xk.stage.add(xk.desktopCon);
    xk.stage.add(xk.desktop);
    xk.desktopBar.add(new xk.mainBar());
    xk.stage.add(xk.desktopBar);
}

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

/**
 * xKanvas Base Container
 * @class Base Container
 */
xk.con = function(o){
	this.children = [];
    this.o = o || {};
};
    
xk.con.prototype = {
	add: function (child) {
        this.children.push(child);
    },
	getChild: function (i) {
        return this.children[i];
    },
	remove: function (child) {
        for (var node, i = 0; node = this.getChild(i); i++) {
            if (node == child) {
                this.children.splice(i, 1);
                return true;
            }

            if (node.remove(child)) {
                return true;
            }
        }

        return false;
    }
}
/**
 * xKanvas Panel
 * @class Panel Class
 * @extends conect Class
 */
xk.pan = function(o){
    xk.con.call(this,o);
};

xk.extend(xk.pan, xk.con);

xk.pan.prototype = { 
	//width: this.o.width || 578,
    //height: this.o.height || 200
}

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
			fontStyle: "normal"
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
				subMenuItems[i].add(itemBox);
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
					console.dir(itemImage);
					console.log(itemImage.attrs.y);
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
						console.log(sMenu.items[a]);
						if(typeof sMenu.items[a].items == "object" && sMenu.items[a].subMenuName != this.subMenuName){
							xk.desktopBar.get("."+sMenu.items[a].subMenuName)[0].hide();
						}
					}
					xk.desktopBar.get("."+this.subMenuName)[0].show();
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

/**
 * xKanvas Button
 * @class Button Class
 * @extends Object Class
 */
xk.btn = function(o){
    var rectX = o.x, rectY = o.y;

    //gradient
    var grd3 = xk.desktop.getContext().createLinearGradient(0, 0, 0, 20);
    grd3.addColorStop(0, "#f78d66");
    grd3.addColorStop(0.05, "#e66228");
    grd3.addColorStop(1, "#393834");

    //Icon Group
    var closeIcon = new Kinetic.Group();
    
    var btnCloseBg = new Kinetic.Circle({
            x: rectX + 17,
            y: rectY + 15,
            radius: 9,
            fill: grd3,
            stroke: "#393834",
            strokeWidth: 1
    });

    var closeIconDown = new Kinetic.Line({
        points: [{x:rectX+13,y:rectY+11},{x:rectX+21,y:rectY+19}],
        stroke: "#595854",
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    var closeIconUp = new Kinetic.Line({
        points: [{x:rectX+13,y:rectY+19},{x:rectX+21,y:rectY+11}],
        stroke: "#595854",
        strokeWidth: 1,
        lineCap: 'round',
        lineJoin: 'round'
    });

    closeIcon.add(btnCloseBg);
    closeIcon.add(closeIconDown);
    closeIcon.add(closeIconUp);

    closeIcon.on("mouseover", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "pointer";
          layer.draw();
    });


    closeIcon.on("mouseout", function() {
          var layer = this.getLayer();
          document.body.style.cursor = "default";
          layer.draw();
    }); 


    closeIcon.on("click", function() {
        this.getParent().getParent().hide();
		xk.render();
    }); 

    return closeIcon;
}

/* Namespace for generated buttons */
xk.btns = {};

xk.btns.closeBtn = function(o){
	return this.init(o);
};

//xk.extend(xk.btns.closeBtn, Kinetic.Group);

xk.btns.closeBtn.prototype = {
	getGradient: function(){
		var grd3 = xk.desktop.getContext().createLinearGradient(0, 0, 0, 20);
		grd3.addColorStop(0, "#f78d66");
		grd3.addColorStop(0.05, "#e66228");
		grd3.addColorStop(1, "#393834");
		
		return grd3;
	},
	getIcon: function(rectX, rectY){
		//Icon Group
		var closeIcon = new Kinetic.Group();
		
		var btnCloseBg = new Kinetic.Circle({
				x: rectX + 17,
				y: rectY + 15,
				radius: 9,
				fill: this.getGradient(),
				stroke: "#393834",
				strokeWidth: 1
		});

		var closeIconDown = new Kinetic.Line({
			points: [{x:rectX+13,y:rectY+11},{x:rectX+21,y:rectY+19}],
			stroke: "#595854",
			strokeWidth: 1,
			lineCap: 'round',
			lineJoin: 'round'
		});

		var closeIconUp = new Kinetic.Line({
			points: [{x:rectX+13,y:rectY+19},{x:rectX+21,y:rectY+11}],
			stroke: "#595854",
			strokeWidth: 1,
			lineCap: 'round',
			lineJoin: 'round'
		});

		closeIcon.add(btnCloseBg);
		closeIcon.add(closeIconDown);
		closeIcon.add(closeIconUp);
		
		return closeIcon;
	},
	init: function(o){
		var rectX = o.x, rectY = o.y;
	
		var ico = this.getIcon(rectX, rectY);
		ico.on("mouseover", this.onMouseover);
		ico.on("mouseout", this.onMouseout);
		ico.on("click", this.onClick);
		return ico;
	},
	onMouseover: function(){
		var layer = this.getLayer();
		document.body.style.cursor = "pointer";
		layer.draw();
	},
	onMouseout: function(){
		var layer = this.getLayer();
		document.body.style.cursor = "default";
		layer.draw();
	},
	onClick: function(e){
		e.cancelBubble = true;
		if (e.stopPropagation) e.stopPropagation();
		//this.getParent().getParent().hide();
		this.getParent().moveToBottom();
		this.getParent().hide();
		xk.desktop.draw();
		//this.getParent().getParent().draw();
		//xk.render();
		document.body.style.cursor = "default";
	}
}

/* Round small buttons */

xk.btns.roundBtns = function(o){
	return this.init(o);
}

xk.extend(xk.btns.roundBtns, xk.btns.closeBtn);

xk.btns.roundBtns.prototype.getGradient = function(){
	var grd4 = xk.desktop.getContext().createLinearGradient(0, 0, 0, 20);
	grd4.addColorStop(0, "#6d6b68");
	grd4.addColorStop(0.05, "#595854");
	grd4.addColorStop(1, "#5a5954");
	
	return grd4;
}

//Minimize Button
xk.btns.roundMinBtn = function(o){
	return this.init(o);
}

xk.extend(xk.btns.roundMinBtn, xk.btns.roundBtns);

xk.btns.roundMinBtn.prototype.getIcon = function(rectX, rectY){
	//Icon Group
	var closeIcon = new Kinetic.Group();
	
    var btnMinimize = new Kinetic.Circle({
		x: rectX + 37,
		y: rectY + 15,
		radius: 9,
		fill: this.getGradient(),
		stroke: "#393834",
		strokeWidth: 1
	});
	
	var minIcon = new Kinetic.Line({
		points: [{x:rectX+32,y:rectY+15},{x:rectX+42,y:rectY+15}],
		stroke: "#393834",
		strokeWidth: 1,
		lineCap: 'round',
		lineJoin: 'round'
		
	});

	closeIcon.add(btnMinimize);
	closeIcon.add(minIcon);
	
	return closeIcon;
}

xk.btns.roundMinBtn.prototype.onClick = function(){
	alert("minimize me")
	//TODO: Minimize
	//this.getParent().getParent().hide();
	//xk.render();
}

//Maximize Button
xk.btns.roundMaxBtn = function(o){
	return this.init(o);
}

xk.extend(xk.btns.roundMaxBtn, xk.btns.roundBtns);

xk.btns.roundMaxBtn.prototype.getIcon = function(rectX, rectY){
	//Icon Group
	var closeIcon = new Kinetic.Group();
	
    var btnMaximize = new Kinetic.Circle({
		x: rectX + 57,
		y: rectY + 15,
		radius: 9,
		fill: this.getGradient(),
		stroke: "#393834",
		strokeWidth: 1
	});
	
	var rectIcon = new Kinetic.Rect({
		x: rectX + 53,
		y: rectY + 11,
		width: 8,
		height: 8,
		stroke: "#393834",
		strokeWidth: 1
	});

	closeIcon.add(btnMaximize);
	closeIcon.add(rectIcon);
	
	return closeIcon;
}

xk.btns.roundMaxBtn.prototype.onClick = function(){
	alert("Maximize me")
	//TODO: Maximize
	//this.getParent().getParent().hide();
	//xk.render();
}
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



