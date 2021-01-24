const ARROWSIZE = 0;
const ARROWLENGTH = 150
const RADIUS = 20;
const LOOPROT = 0.5;
const ARROWSCALE = 3;
const ARROWWIDTH = 2.83;
const ARROWHEIGHT = 5.98;
const INITLENGTH = 20;

var selected = false;

function drawInitial(state) {
    var figure = draw.group();
    var line = figure.line(state.position.x - RADIUS - INITLENGTH, state.position.y, state.position.x - RADIUS, state.position.y, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
    var head = figure.image("./img/arrow.svg");
    head.transform({ scale: 3, tx: state.position.x - RADIUS - 7, ty: state.position.y - 9});
    var label = figure.text("START");
    label.center(state.position.x - RADIUS - INITLENGTH- 25, state.position.y);

}

function drawState(state) { 
	var figure = draw.group();
	var outer = figure.circle(40, {
			cx : state.position.x, 
			cy : state.position.y,
			stroke: "black",
			'stroke-width': 1.5,
			fill: "white",
			'fill-opacity': 0});
	if (state.accepting) {
		var inner = figure.circle(30, { 
			cx : state.position.x, 
			cy : state.position.y, 
			stroke: "black", 
			fill: "none"}); }

	var label = figure.text(state.label, {
			x: state.position.x -3,
			y: state.position.y -15})

    	figure.mouseover(function () {
       		 outer.stroke({ width: 2.5 });
		document.body.style.cursor = "pointer"; })

	figure.mouseout(function() {
    outer.stroke({ width: 1.5 });
    document.body.style.cursor = "default"; })
    figure.click(function() {
        if (selected) {
            if (selected === state) {
                selected = false;
                refresh();
            } else {
                var label = prompt("Enter a label for this transition (leave empty to make no transition)");
                if (label === "") {
                    nodeInterface(state);
                    selected = state;
                } else {
                    myDFA.addArrow(new Transition(selected, state, [], "", label));
                    refresh();
                }
            }
        } else {
            nodeInterface(state);
            selected = state;
        }
	})
}

function drawTransition(transition) {
    var figure = draw.group();
    var to = transition.to;
    var from = transition.from;
    var x1;
    var x21;
    var x22;
    var x2;
    var x3;
    var y1;
    var y21;
    var y22;
    var y2;
    var y3;
    var xmid;
    var ymid;
    var line;
    var angle;
    var labelangle;
    if (transition.bend === "loop above") { 
	    x1 = to.position.x + RADIUS * Math.sin(LOOPROT);
        y1 = to.position.y - RADIUS * Math.cos(LOOPROT);
        x21 = to.position.x + 2 * RADIUS;
        y21 = to.position.y - 5 * RADIUS;
	    x22 = to.position.x - 2 * RADIUS;
	    y22 = to.position.y - 5 * RADIUS;
        x3 = to.position.x - RADIUS * Math.sin(LOOPROT);
        y3 = to.position.y - RADIUS * Math.cos(LOOPROT);
        xmid = to.position.x;
        ymid = to.position.y - 4 * RADIUS;
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
        angle = -LOOPROT + Math.PI/2;
	labelangle = 0;
    } else if (transition.bend === "loop below") {
        x1 = to.position.x - RADIUS * Math.sin(LOOPROT);
        y1 = to.position.y + RADIUS * Math.cos(LOOPROT);
        x21 = to.position.x - 2 * RADIUS;
        y21 = to.position.y + 5 * RADIUS;
	x22 = to.position.x + 2 * RADIUS;
	y22 = to.position.y + 5 * RADIUS;
        x3 = to.position.x + RADIUS * Math.sin(LOOPROT);
        y3 = to.position.y + RADIUS * Math.cos(LOOPROT);
        xmid = to.position.x;
        ymid = to.position.y + 4 * RADIUS;
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
        angle = -LOOPROT - Math.PI / 2;
        labelangle = Math.PI;
    } else if (transition.bend === "loop left") {
        x1 = to.position.x - RADIUS * Math.cos(LOOPROT);
        y1 = to.position.y - RADIUS * Math.sin(LOOPROT);
        x21 = to.position.x - 5 * RADIUS;
        y21 = to.position.y - 2 * RADIUS;
	    x22 = to.position.x - 5 * RADIUS;
	    y22 = to.position.y + 2 * RADIUS;
        x3 = to.position.x - RADIUS * Math.cos(LOOPROT);
        y3 = to.position.y + RADIUS * Math.sin(LOOPROT);
        xmid = to.position.x - 4 * RADIUS;
        ymid = to.position.y;
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
        angle = -LOOPROT;
        labelangle = -Math.PI/2;
    } else if (transition.bend === "loop right") {
        x1 = to.position.x + RADIUS * Math.cos(LOOPROT);
        y1 = to.position.y + RADIUS * Math.sin(LOOPROT);
        x21 = to.position.x + 5 * RADIUS;
        y21 = to.position.y + 2 * RADIUS;
	    x22 = to.position.x + 5 * RADIUS;
	    y22 = to.position.y - 2 * RADIUS;
        x3 = to.position.x + RADIUS * Math.cos(LOOPROT);
        y3 = to.position.y - RADIUS * Math.sin(LOOPROT);
        xmid = to.position.x + 4 * RADIUS;
        ymid = to.position.y;
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
        angle = -LOOPROT + Math.PI; 
	labelangle = Math.PI/2;
    } else if (transition.bend === "bend left") {
	    angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    labelangle = angle;
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
        x1 = from.position.x + RADIUS * Math.cos(angle- (Math.PI/4)); 
        y1 = from.position.y + RADIUS * Math.sin(angle- (Math.PI/4));
        x2 = xmid + 3 * RADIUS * Math.cos(angle - (Math.PI/2));
        y2 = ymid + 3 * RADIUS * Math.sin(angle - (Math.PI/2));
        x3 = to.position.x + RADIUS * Math.cos(angle- 3*(Math.PI/4));
        y3 = to.position.y + RADIUS * Math.sin(angle- 3*(Math.PI/4));
        line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
    } else if (transition.bend === "bend right") { 
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    labelangle = angle;
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
        x1 = from.position.x + RADIUS * Math.cos(angle+ (Math.PI/4)); 
        y1 = from.position.y + RADIUS * Math.sin(angle+ (Math.PI/4));
        x2 = xmid + 3 * RADIUS * Math.cos(angle + (Math.PI/2));
        y2 = ymid + 3 * RADIUS * Math.sin(angle + (Math.PI/2));
        x3 = to.position.x + RADIUS * Math.cos(angle+ 3*(Math.PI/4));
        y3 = to.position.y + RADIUS * Math.sin(angle+ 3*(Math.PI/4));
        line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
    } else {
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    labelangle = angle;
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
        x1 = from.position.x + RADIUS * Math.cos(angle); 
        y1 = from.position.y + RADIUS * Math.sin(angle);
        x2 = xmid 
        y2 = ymid 
        x3 = to.position.x - RADIUS * Math.cos(angle);
        y3 = to.position.y - RADIUS * Math.sin(angle);
        line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1.5, 'stroke': 'black' });
    }
    angle = Math.atan2(to.position.y - y3, to.position.x - x3);
    head = figure.image('./img/arrow.svg');
    head.transform({ scale: 3, tx: x3, ty: y3, rotate: 180 * angle / Math.PI});
    var w = 5;
    var h = 6;
    head.dmove(-w/2, -h/2);
    figure.mouseover(function () {
        line.stroke({width : 4});
        document.body.style.cursor = "pointer";
    })
    figure.mouseout(function () {
        line.stroke({ width: 1.5 });
        document.body.style.cursor = "default";
    })
    figure.click(function () {
        arrowInterface(transition);
    })

	var point = line.pointAt(line.length() / 2);
    	var label = figure.text(transition.label);  
	label.center(point.x + 15*Math.sin(labelangle),point.y-15*Math.cos(labelangle));

}

function refreshDrawing() {
    draw.clear();
    selected = false;
	myDFA.transitions.forEach(transition => {drawTransition(transition);})
    myDFA.states.forEach(state => {drawState(state);})
    drawInitial(myDFA.initial);
}

function refresh(){
	defaultPanel();
	refreshDrawing();
}
