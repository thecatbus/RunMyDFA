const ARROWSIZE = 0;
const ARROWLENGTH = 150
const RADIUS = 20;
const LOOPROT = 0.5;
const ARROWSCALE = 3;
const ARROWWIDTH = 2.83;
const ARROWHEIGHT = 5.98;


function drawState(state) { 
	var figure = draw.group();
	var outer = figure.circle(40, {
			cx : state.position.x, 
			cy : state.position.y,
			stroke: "black",
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
        outer.stroke({ width: 2 });
		document.body.style.cursor = "pointer"; })
	figure.mouseout(function() {
        outer.stroke({ width: 1 });
		document.body.style.cursor = "default"; })
	figure.dblclick(function() {
		nodeInterface(state)
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
    var line;
    var angle;
    if (transition.bend === "loop above") { 
	    x1 = to.position.x + RADIUS * Math.sin(LOOPROT);
        y1 = to.position.y - RADIUS * Math.cos(LOOPROT);
        x21 = to.position.x + 2 * RADIUS;
        y21 = to.position.y - 5 * RADIUS;
	    x22 = to.position.x - 2 * RADIUS;
	    y22 = to.position.y - 5 * RADIUS;
        x3 = to.position.x - RADIUS * Math.sin(LOOPROT);
        y3 = to.position.y - RADIUS * Math.cos(LOOPROT);
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
        angle = -LOOPROT + Math.PI/2;
    } else if (transition.bend === "loop below") {
        x1 = to.position.x - RADIUS * Math.sin(LOOPROT);
        y1 = to.position.y + RADIUS * Math.cos(LOOPROT);
        x21 = to.position.x - 2 * RADIUS;
        y21 = to.position.y + 5 * RADIUS;
	    x22 = to.position.x + 2 * RADIUS;
	    y22 = to.position.y + 5 * RADIUS;
        x3 = to.position.x + RADIUS * Math.sin(LOOPROT);
        y3 = to.position.y + RADIUS * Math.cos(LOOPROT);
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
        angle = -LOOPROT - Math.PI / 2;
    } else if (transition.bend === "loop left") {
        x1 = to.position.x - RADIUS * Math.cos(LOOPROT);
        y1 = to.position.y - RADIUS * Math.sin(LOOPROT);
        x21 = to.position.x - 5 * RADIUS;
        y21 = to.position.y - 2 * RADIUS;
	    x22 = to.position.x - 5 * RADIUS;
	    y22 = to.position.y + 2 * RADIUS;
        x3 = to.position.x - RADIUS * Math.cos(LOOPROT);
        y3 = to.position.y + RADIUS * Math.sin(LOOPROT);
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
        angle = -LOOPROT;
    } else if (transition.bend === "loop right") {
        x1 = to.position.x + RADIUS * Math.cos(LOOPROT);
        y1 = to.position.y + RADIUS * Math.sin(LOOPROT);
        x21 = to.position.x + 5 * RADIUS;
        y21 = to.position.y + 2 * RADIUS;
	    x22 = to.position.x + 5 * RADIUS;
	    y22 = to.position.y - 2 * RADIUS;
        x3 = to.position.x + RADIUS * Math.cos(LOOPROT);
        y3 = to.position.y - RADIUS * Math.sin(LOOPROT);
        line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
        angle = -LOOPROT + Math.PI;
    } else if (transition.bend === "bend left") {
	    angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
        x1 = from.position.x + RADIUS * Math.cos(angle- (Math.PI/4)); 
        y1 = from.position.y + RADIUS * Math.sin(angle- (Math.PI/4));
        x2 = xmid + 3 * RADIUS * Math.cos(angle - (Math.PI/2));
        y2 = ymid + 3 * RADIUS * Math.sin(angle - (Math.PI/2));
        x3 = to.position.x + RADIUS * Math.cos(angle- 3*(Math.PI/4));
        y3 = to.position.y + RADIUS * Math.sin(angle- 3*(Math.PI/4));
        line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
    } else if (transition.bend === "bend right") { 
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
        x1 = from.position.x + RADIUS * Math.cos(angle+ (Math.PI/4)); 
        y1 = from.position.y + RADIUS * Math.sin(angle+ (Math.PI/4));
        x2 = xmid + 3 * RADIUS * Math.cos(angle + (Math.PI/2));
        y2 = ymid + 3 * RADIUS * Math.sin(angle + (Math.PI/2));
        x3 = to.position.x + RADIUS * Math.cos(angle+ 3*(Math.PI/4));
        y3 = to.position.y + RADIUS * Math.sin(angle+ 3*(Math.PI/4));
        line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
    } else {
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
        x1 = from.position.x + RADIUS * Math.cos(angle); 
        y1 = from.position.y + RADIUS * Math.sin(angle);
        x2 = xmid 
        y2 = ymid 
        x3 = to.position.x - RADIUS * Math.cos(angle);
        y3 = to.position.y - RADIUS * Math.sin(angle);
        line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
    }

    // line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
    head = figure.image('/img/arrow.svg');
    head.transform({ scale: 3, tx: x3, ty: y3, rotate: 180 * angle / Math.PI});
    // head.center(x3, y3);
    // head.rotate(180*angle/Math.PI, head.cx(), head.cy());
    var w = 5;
    var h = 6;
    console.log(Math.sin(angle), Math.cos(angle))
    head.dmove(-w/2, -h/2);
    figure.mouseover(function () {
        line.stroke({width : 2});
        document.body.style.cursor = "pointer";
    })
    figure.mouseout(function () {
        line.stroke({ width: 1 });
        document.body.style.cursor = "default";
    })
    figure.dblclick(function () {
        arrowInterface(transition);
    })
}

function refresh() {
	defaultPanel();
	draw.clear();
	myDFA.transitions.forEach(transition => {drawTransition(transition);})
	myDFA.states.forEach(state => {drawState(state);})
}
