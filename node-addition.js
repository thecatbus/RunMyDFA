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

function isFree(loc, state, automaton) {
	var free = true;
	var pos = findposition(state, loc);
	automaton.states.forEach(function(node) {
		if (node.position.x == pos.x && node.position.y == pos.y) {free = false;}
	})
	return free;
}

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
	for (loc of LOCATIONS) {
		if (isFree(loc, node, myDFA)) { addghost(node, loc);}
	}
}

function arrowInterface(arrow) {
	if (arrow.to === arrow.from) {
		selfArrowInterface(arrow);
	} else {
		toArrowInterface(arrow);
	}
}
