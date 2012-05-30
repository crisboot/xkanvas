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
xk.ver = 'XXversionXX';

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
