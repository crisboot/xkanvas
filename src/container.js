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