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

	figure.mouseover(function() {
		outer.radius(25);
		document.body.style.cursor = "pointer"; })
	figure.mouseout(function() {
		outer.radius(20);
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
        } else if (transition.bend === "bend left") { 
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
            x1 = from.position.x + RADIUS * Math.cos(angle- (Math.PI/4)); 
            y1 = from.position.y + RADIUS * Math.sin(angle- (Math.PI/4));
       	    x2 = xmid + 3 * RADIUS * Math.cos(angle - (Math.PI/2));
            y2 = ymid + 3 * RADIUS * Math.sin(angle - (Math.PI/2));
            x3 = to.position.x + RADIUS * Math.cos(angle- 3*(Math.PI/4));
            y3 = to.position.y + RADIUS * Math.sin(angle- 3*(Math.PI/4));
       	    line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' }); } 
	else if (transition.bend === "bend right") { 
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
            x1 = from.position.x + RADIUS * Math.cos(angle+ (Math.PI/4)); 
            y1 = from.position.y + RADIUS * Math.sin(angle+ (Math.PI/4));
       	    x2 = xmid + 3 * RADIUS * Math.cos(angle + (Math.PI/2));
            y2 = ymid + 3 * RADIUS * Math.sin(angle + (Math.PI/2));
            x3 = to.position.x + RADIUS * Math.cos(angle+ 3*(Math.PI/4));
            y3 = to.position.y + RADIUS * Math.sin(angle+ 3*(Math.PI/4));
       	    line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' }); } 
	else {
	    var angle = Math.atan2( to.position.y - from.position.y, to.position.x - from.position.x);
	    xmid = (to.position.x + from.position.x) / 2 
	    ymid = (to.position.y + from.position.y) / 2 
            x1 = from.position.x + RADIUS * Math.cos(angle); 
            y1 = from.position.y + RADIUS * Math.sin(angle);
       	    x2 = xmid 
            y2 = ymid 
            x3 = to.position.x - RADIUS * Math.cos(angle);
            y3 = to.position.y - RADIUS * Math.sin(angle);
       	    line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' }); }

    line = figure.path(`M${x1} ${y1} C ${x21} ${y21} ${x22} ${y22} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
    head = figure.image('/img/arrow.svg');
    head.transform({ scale: 3, tx: x3, ty: y3, rotate: 180 * angle / Math.PI});
    // head.center(x3, y3);
    // head.rotate(180*angle/Math.PI, head.cx(), head.cy());
    var w = 5;
    var h = 6;
    // console.log(w, h);
    console.log(Math.sin(angle), Math.cos(angle))
    // console.log(w * Math.cos(angle) - h * Math.sin(angle), h * Math.cos(angle) + w * Math.sin(angle))
    // head.dmove(+ h/2 * Math.sin(angle), - h/2 * Math.cos(angle))
    head.dmove(-w/2, -h/2);
    // head.scale(ARROWSCALE, x3, y3);
    
}


// function draw_arrowhead(context, from, to, radius) {
//     var x_center = to.x;
//     var y_center = to.y;
// 
//     var angle;
 //    var x;
  //   var y;

//     context.beginPath();
// 
//     angle = Math.atan2(to.y - from.y, to.x - from.x)
//     x = radius * Math.cos(angle) + x_center;
//     y = radius * Math.sin(angle) + y_center;
// 
//     context.moveTo(x, y);
// 
//     angle += (1.0 / 3.0) * (2 * Math.PI)
//     x = radius * Math.cos(angle) + x_center;
//     y = radius * Math.sin(angle) + y_center;
// 
  ////    context.lineTo(x, y);

//     angle += (1.0 / 3.0) * (2 * Math.PI)
//     x = radius * Math.cos(angle) + x_center;
//     y = radius * Math.sin(angle) + y_center;

//     context.lineTo(x, y);

//     context.closePath();

//     context.fill();
// }

// function draw_transition(context, transition) {
//     console.log(transition.from.position[0], transition.from.position[1]);
//     if (transition.to === transition.from) {
//         context.beginPath();
//         context.arc(transition.to.position.x + RADIUS + ARROWSIZE, transition.to.position.y + RADIUS, RADIUS, Math.PI*3/2, Math.PI);
 //        context.stroke();
//         draw_arrowhead(context, { x : transition.to.position.x + 2 * RADIUS, y : transition.to.position.y }, { x : transition.to.position.x + RADIUS + ARROWSIZE, y : transition.to.position.y }, ARROWSIZE);
//     } else {
//         context.beginPath();
//         var angle;
//         var x;
//         var y;
//         console.log(transition.to.position.y - transition.from.position.y, transition.to.position.x - transition.from.position.x);
//         angle = Math.atan2(transition.to.position.y - transition.from.position.y, transition.to.position.x - transition.from.position.x)
//         x = transition.to.position.x - (RADIUS + ARROWSIZE) * Math.cos(angle);
//         y = transition.to.position.y - (RADIUS + ARROWSIZE) * Math.sin(angle);
 //        context.moveTo(x, y);
 //        x = transition.from.position.x + (RADIUS + ARROWSIZE) * Math.cos(angle);
  //       y = transition.from.position.y + (RADIUS + ARROWSIZE) * Math.sin(angle);
   //      context.lineTo(x, y);
   //      context.stroke();
   //      draw_arrowhead(context, transition.to.position, { x: x, y: y }, ARROWSIZE);
  //   }
// }
// 

function refresh() {
	defaultPanel();
	draw.clear();
	myDFA.transitions.forEach(transition => {drawTransition(transition);})
	myDFA.states.forEach(state => {drawState(state);})
}
