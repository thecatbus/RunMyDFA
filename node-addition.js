function nodeInterface(state) {
	startPanel(state);

	// NEW NODES
	var above = draw.circle(40, {
		cx : state.position.x,
		cy : state.position.y - ARROWLENGTH, 
		stroke: "#D3D3D3",
		fill: "white"});
	above.mouseover(function() {
		this.attr({stroke: "black"})
	})
	above.mouseout(function() {
		this.attr({stroke: "#D3D3D3"})
	})
	above.click(function() {
		namecounter+=1;
		myDFA.addNode(namecounter.toString(), 
			      {ref: state, 
			       where: {left: false, right: false, above: true, below: false}},
			       false, "");
		refresh();
	})

	var below = draw.circle(40, {
		cx : state.position.x,
		cy : state.position.y + ARROWLENGTH, 
		stroke: "#D3D3D3",
		fill: "white"});
	below.mouseover(function() {
		this.attr({stroke: "black"})
	})
	below.mouseout(function() {
		this.attr({stroke: "#D3D3D3"})
	})
	below.click(function() {
		namecounter+=1;
		myDFA.addNode(namecounter.toString(), 
			      {ref: state, 
			       where: {left: false, right: false, above: false, below: true}},
			       false, "");
		refresh();
	})

	var left = draw.circle(40, {
		cx : state.position.x - ARROWLENGTH,
		cy : state.position.y, 
		stroke: "#D3D3D3",
		fill: "white"});
	left.mouseover(function() {
		this.attr({stroke: "black"})
	})
	left.mouseout(function() {
		this.attr({stroke: "#D3D3D3"})
	})
	left.click(function() {
		namecounter+=1;
		myDFA.addNode(namecounter.toString(), 
			      {ref: state, 
			       where: {left: true, right: false, above: false, below: false}},
			       false, "");
		refresh();
	})

	var right = draw.circle(40, {
		cx : state.position.x + ARROWLENGTH,
		cy : state.position.y, 
		stroke: "#D3D3D3",
		fill: "white"});
	right.mouseover(function() {
		this.attr({stroke: "black"})
	})
	right.mouseout(function() {
		this.attr({stroke: "#D3D3D3"})
	})
	right.click(function() {
		namecounter+=1;
		myDFA.addNode(namecounter.toString(), 
			      {ref: state, 
			       where: {left: false, right: true, above: false, below: false}},
			       false, "");
		refresh();
	})
}
