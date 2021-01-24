function findposition(node, where) {
        let position = { x: 0, y: 0 }
        if (where.left) position.x = -1;
        if (where.right) position.x = 1;
        if (where.above) position.y = -1;
        if (where.below) position.y = 1;
        let len = Math.sqrt(position.x * position.x + position.y * position.y);
        position.x = ARROWLENGTH * position.x / len + node.position.x;
        position.y = ARROWLENGTH * position.y / len + node.position.y;
	return position;}

function addghost(node, where) {
	var pos = findposition(node,where);
	var ghost = draw.circle(40, {
			cx: pos.x,
			cy: pos.y,
			stroke: "#D3D3D3",
			fill: "white",
			'fill-opacity': 0});
	ghost.mouseover(function() {
		this.attr({stroke: "black"});
		document.body.style.cursor = "pointer";
	})
	ghost.mouseout(function() {
		this.attr({stroke: "#D3D3D3"});
		document.body.style.cursor = "default";
	})
	ghost.click(function() {
		namecounter+=1;
		myDFA.addNode(namecounter.toString(), {ref: node, where: where}, false, "");
		refresh();
	}) 
}

	

function nodeInterface(node) {
	refresh();
	startPanel(node);
	var above = addghost(node, {left: false, right: false, above: true, below: false});
	var below = addghost(node, {left: false, right: false, above: false, below: true});
	var left = addghost(node, {left: true, right: false, above: false, below: false});
	var right = addghost(node, {left: false, right: true, above: false, below: false});
	var aboveleft = addghost(node, {left: true, right: false, above: true, below: false});
	var aboveright = addghost(node, {left: false, right: true, above: true, below: false});
	var belowleft = addghost(node, {left: true, right: false, above: false, below: true});
	var belowright = addghost(node, {left: false, right: true, above: false, below: true});
}
