function panelrefresh() {
	panel.clear(); 
	var background = panel.rect(250, height, {
		fill: 'black',
		'fill-opacity':0.6});
}

function button(number, text, effect) {
	var button = panel.group()
	var box = button.rect(250, 30, {
		x: 0,
		y: number * 30 + 100, 
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
		y: number * 30 + 100,
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
		node.label = prompt("Edit the node label", node.label);
		refresh(); });
	var goback = button(3, "Back to previous menu", function() {
		refresh();});
}

function defaultPanel() {
	panelrefresh();
	var changeAlph = button(0, "Change alphabet", function() {
	 	alert("Not yet implemented"); });
	var getTex = button(1, "Generate LaTeX", function() {
		prompt("Remember to add preamble!", tex(myDFA))});
	var pream = button(2, "View LaTeX preamble", function() {
		prompt("Copy this at the start of your TeX file.", preamble())});
	var center = button(3, "Center screen", function() {
		window.scroll(2500-width/2, 2500-height/2); });
}

