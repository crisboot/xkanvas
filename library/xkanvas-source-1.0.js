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
* @date May 09 2012
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


xk.stage = {};
xk.desktop = {};

xk.init = function(o){
	var obj = {
		container: "container",
		width: window.screen.width || 578,
		height: window.screen.height || 200
	}
	xk.extend(obj, o);
	
	xk.stage = new Kinetic.Stage({
		container: obj.container,
		width: obj.width,
		height: obj.height
	});

    xk.desktop  = new Kinetic.Layer();
}

xk.render = function(o){
    xk.stage.add(xk.desktop)
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
xk.window = function(){ 
    this.grp = new Kinetic.Group({
        x: 0,
        y: 0,
        draggable: true
    });

        var grd = xk.desktop.getContext().createLinearGradient(0, 0, 0, 200);
        grd.addColorStop(0, "#6d6b68");
        grd.addColorStop(0.03, "#595854");
        grd.addColorStop(0.1, "#3c3b37");

        var box = new Kinetic.Rect({
          x: 500,
          y: 400,
          width: 550,
          height: 350,
          cornerRadius: 5,
          fill: grd,
          stroke: "black",
          strokeWidth: 1,
          name: "box"
        });
    this.grp.add(box);

	return this.grp;
}


