const ARROWSIZE = 10;
const ARROWLENGTH = 150
const RADIUS = 50;

function drawState(state) { 
	if (state.accepting) {
		var outer = draw.circle(40, {
			cx : state.position.x, 
			cy : state.position.y,
			stroke: "black",
			fill: "white"});

		var inner = draw.circle(30, { 
			cx : state.position.x, 
			cy : state.position.y, 
			stroke: "black", 
			fill: "none"}); 
	} else {
		var outer = draw.circle(40, {
			cx : state.position.x, 
			cy : state.position.y,
			stroke: "black",
			fill: "white"});
	}
	outer.mouseover(function() {
		this.radius(25)
	})
	outer.mouseout(function() {
		this.radius(20)
	})
	outer.dblclick(function() {
		nodeInterface(state)
	})
}
// ctx.fillStyle = "#000000";
// ctx.strokeStyle = "#000000";
// ctx.lineWidth = 3;

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
function refresh() {
	draw.clear(); 
	myDFA.states.forEach(state => { 
		drawState(state); 
	})
}
