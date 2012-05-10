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
		this.getParent().getParent().hide();
		xk.render();
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