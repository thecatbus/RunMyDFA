function panelrefresh() {
	panel.clear(); 

	var background = panel.rect(250, height, {
		fill: 'black',
		'fill-opacity':0.6});
	var creds = button(12, "Fox and Parth @71springs", function() {});
	var github = button(13, "Github", function() {window.open("https://github.com/bognovogomira/RunMyDFA")});

	var runtext = panel.text("run", {x:0, y:-7, fill: "#999999"});
	runtext.font({
		family: 'Menlo',
		size: 50});
	var mytext = panel.text("my", {x:65, y:-20, fill: '#B2B2B2'});
	mytext.font({
		family: 'Menlo',
		size: 90});

	var dfatext = panel.text("DFA", {x:0, y:30, fill: "white"});
	dfatext.font({
		family: 'Menlo',
		size: 125});
}

function button(number, text, effect) {
	var button = panel.group()
	var box = button.rect(250, 30, {
		x: 0,
		y: number * 30 + 225,
		fill: "black",
		'fill-opacity' :0});
	box.mouseover(function() {
		this.attr({fill: "#7f7f7f",
			   'fill-opacity': 0.7});
		document.body.style.cursor = "pointer";})
	box.mouseout(function() {
		this.attr({fill: "black",
			   'fill-opacity': 0});
		document.body.style.cursor = "default";})
	box.click(effect);

	var text = button.text(text, {
		x: 10,
		y: number * 30 + 225,
		fill: 'white'});
	text.font({
		family: 'Menlo'});
	text.mouseover(function() {
		box.attr({fill: "#7f7f7f",
			   'fill-opacity': 0.3});
		document.body.style.cursor = "pointer";})
	text.click(effect);

	return button;
}

function startPanel(node) {
	panelrefresh();
	var makeinit = button(0, "Make initial", function() {
		myDFA.initial = node;
		refresh(); });
	var toggle = button(1, "Toggle accepting", function() {
		node.accepting = !node.accepting;
		refresh(); });
	var label = button(2, "Change label", function() {
		var label = prompt("Edit the node label", node.label);
		if (label) {node.label = label};
		refresh(); });
	var loop = button(3, "Add loop...", function() {
		var above = button(4, "above", function() {
			var label = prompt("Enter symbols for this transition", "");
			var args = label.split(",");
			var arrow = new Transition (node, node, args, "loop above", label);
			myDFA.transitions.push(arrow);
			refresh();});
		var below = button(5, "below", function() {
			var label = prompt("Enter symbols for this transition", "");
			var args = label.split(",");
			var arrow = new Transition (node, node, args, "loop below", label);
			myDFA.transitions.push(arrow); 
			refresh();});
		var left = button(6, "left", function() {
			var label = prompt("Enter symbols for this transition", "");
			var args = label.split(",");
			var arrow = new Transition (node, node, args, "loop left", label);
			myDFA.transitions.push(arrow); 
			refresh();});
		var right = button(7, "right", function() {
			var label = prompt("Enter symbols for this transition", "");
			var args = label.split(",");
			var arrow = new Transition (node, node, args, "loop right", label);
			myDFA.transitions.push(arrow); 
			refresh();}); 
	});
	var goback = button(11, "Back to previous menu", function() {
		refresh();});
}

function toArrowInterface(transition) {
	panelrefresh();
	var bendleft = button(0, "Bend left", function() {
		transition.bendleft();
		refreshDrawing(); });
	var bendright = button(1, "Bend right", function() {
		transition.bendright();
		refreshDrawing(); });
	var change = button(2, "Change label", function() {
		transition.switchlabels(prompt("Enter new label", transition.label))
		refreshDrawing();
	});
	var change = button(3, "Delete", function () {
		transition.del();
		refreshDrawing();
	});
	var goback = button(11, "Back to previous menu", function() {
		refresh();});
}

function selfArrowInterface(transition) {
	panelrefresh();
	var bendleft = button(0, "Rotate clockwise", function() {
		transition.bendleft();
		refreshDrawing(); });
	var bendright = button(1, "Rotate counterclockwise", function() {
		transition.bendright();
		refreshDrawing(); });
	var change = button(2, "Change label", function() {
		transition.switchlabels(prompt("Enter new label", transition.label))
		refreshDrawing();
	});
	var change = button(3, "Delete", function () {
		transition.del();
		refreshDrawing();
	});
	var goback = button(11, "Back to previous menu", function() {
		refresh();});
}

function defaultPanel() {
	panelrefresh();
	var getTex = button(0, "Generate LaTeX", function() {
		prompt("Remember to add preamble!", tex(myDFA))});
	var pream = button(1, "View LaTeX preamble", function() {
		prompt("Copy this at the start of your TeX file.", preamble())});
	var center = button(2, "Center screen", function() {
		window.scroll(2500-width/2, 2500-height/2); });
}

