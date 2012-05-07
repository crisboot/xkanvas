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
* @date May 06 2012
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
 * @namespace
 */
var xk = {};
/**
 * xKanvas Global Namespace
 * @property {String} Version
 */
xk.ver = '1.0';

xk.extend = function(obj1, obj2) {
        for(var key in obj2.prototype) {
            console.log(key)
            if(obj2.prototype.hasOwnProperty(key) && obj1.prototype[key] === undefined) {
                obj1.prototype[key] = obj2.prototype[key];
            }
        }
    }; 

/**
 * xKanvas Base Object
 * @class Abstract Base Object Class
 */
xk.obj = function(o){
    this.o = o || {};
};
xk.obj.prototype = {
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
 * @property {Object} Base Container
 */
xk.con = {
    
}


/**
 * xKanvas Button
 * @class Button Class
 * @extends Object Class
 */
xk.btn = function(o){
    xk.obj.call(this,o);
};

xk.extend(xk.btn, xk.obj);

xk.btn.prototype.onClick = function(){
        alert("Clicked");
};


