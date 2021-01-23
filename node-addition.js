function nodeInterface(state) {
	// TOGGLE ACCEPTING
	var toggle = draw.rect(150, 50, {
		x : 50,
		y : 50, 
		stroke: "black",
		fill: "white"});
	toggle.radius(15);
	toggle.mouseover(function() {
		this.attr({ 'stroke-width': 3})
	})
	toggle.mouseout(function() {
		this.attr({ 'stroke-width': 1})
	})
	toggle.click(function() {
		state.accepting = !state.accepting;
		refresh();
	})

	var toggletext = draw.text("Toggle accepting", { x : 65, y : 60});
	toggletext.font({
		family: 'Helvetica'})

	// CHANGE LABEL
	var label = draw.rect(150, 50, {
		x : 50,
		y : 110, 
		stroke: "black",
		fill: "white"});
	label.radius(15);
	label.mouseover(function() {
		this.attr({ 'stroke-width': 3})
	})
	label.mouseout(function() {
		this.attr({ 'stroke-width': 1})
	})
	label.click(function() {
		state.label = prompt("Edit the node label", state.label);
		refresh();
	})

	var labeltext = draw.text("Edit node label", { x : 75, y : 120});
	labeltext.font({
		family: 'Helvetica'})

	// MAKE INITIAL 
	var makeinit = draw.rect(150, 50, {
		x : 50,
		y : 170, 
		stroke: "black",
		fill: "white"});
	makeinit.radius(15);
	makeinit.mouseover(function() {
		this.attr({ 'stroke-width': 3})
	})
	makeinit.mouseout(function() {
		this.attr({ 'stroke-width': 1})
	})
	makeinit.click(function() {
		myDFA.initial = state;
		refresh();
	})

	var initext = draw.text("Make initial", { x : 85, y : 180});
	initext.font({
		family: 'Helvetica'})

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
