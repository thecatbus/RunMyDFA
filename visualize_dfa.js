const ARROWSIZE = 0;
const ARROWLENGTH = 150
const RADIUS = 20;
const LOOPROT = 0.5;

function drawState(state) { 
	var figure = draw.group();
	var outer = figure.circle(40, {
			cx : state.position.x, 
			cy : state.position.y,
			stroke: "black",
			fill: "white"});
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
    var x2;
    var x3;
    var y1;
    var y2;
    var y3;
    var line;
    if (to === from) {
        if (transition.bend.loop === "below") {
            x1 = to.position.x + RADIUS * Math.sin(LOOPROT);
            y1 = to.position.y + RADIUS * Math.cos(LOOPROT);
            x2 = to.position.x;
            y2 = to.position.y + 3 * RADIUS;
            x3 = to.position.x - RADIUS * Math.sin(LOOPROT);
            y3 = to.position.y + RADIUS * Math.cos(LOOPROT);
        } else if (transition.bend.loop === "left") {
            x1 = to.position.x - RADIUS * Math.sin(LOOPROT);
            y1 = to.position.y + RADIUS * Math.cos(LOOPROT);
            x2 = to.position.x;
            y2 = to.position.y + 3 * RADIUS;
            x3 = to.position.x - RADIUS * Math.cos(LOOPROT);
            y3 = to.position.y + RADIUS * Math.sin(LOOPROT);
        } else if (transition.bend.loop === "below") {
            x1 = to.position.x + RADIUS * Math.sin(LOOPROT);
            y1 = to.position.y + RADIUS * Math.cos(LOOPROT);
            x2 = to.position.x;
            y2 = to.position.y + 3 * RADIUS;
            x3 = to.position.x - RADIUS * Math.sin(LOOPROT);
            y3 = to.position.y + RADIUS * Math.cos(LOOPROT);
        } else {
            x1 = to.position.x + RADIUS * Math.sin(LOOPROT);
            y1 = to.position.y + RADIUS * Math.cos(LOOPROT);
            x2 = to.position.x;
            y2 = to.position.y + 3 * RADIUS;
            x3 = to.position.x - RADIUS * Math.sin(LOOPROT);
            y3 = to.position.y + RADIUS * Math.cos(LOOPROT);
        }
    } else {
        var angle;
        angle = Math.atan2(to.position.y - from.position.y, to.position.x - from.position.x)
        x1 = to.position.x - (RADIUS + ARROWSIZE) * Math.cos(angle);
        y1 = to.position.y - (RADIUS + ARROWSIZE) * Math.sin(angle);
        x3 = from.position.x + (RADIUS + ARROWSIZE) * Math.cos(angle);
        y3 = from.position.y + (RADIUS + ARROWSIZE) * Math.sin(angle);
        x2 = (x1 + x3) / 2;
        y2 = (y1 + y3) / 2;

    }
    line = figure.path(`M${x1} ${y1} Q ${x2} ${y2} ${x3} ${y3}`, { 'fill': "none", 'stroke-width': 1, 'stroke': 'black' });
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
    myDFA.transitions.forEach(transition => {
        drawTransition(transition);
    })
	myDFA.states.forEach(state => { 
		drawState(state); 
	})
}
