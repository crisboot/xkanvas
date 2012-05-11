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
* @date May 11 2012
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
	
	var imageObj = new Image();
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
	};
	imageObj.src = "./img/ico-xfce-terminal.png";
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
    this.bar.add(box);
    return this.bar;
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
	onClick: function(){
		//this.getParent().getParent().hide();
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

    var grd = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#6d6b68");
    grd.addColorStop(0.03, "#595854");
    grd.addColorStop(0.1, "#3c3b37");

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

	return this.grp;
}



