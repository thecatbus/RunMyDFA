const ARROWLENGTH = 250

class State { 
	constructor(name="0", 
               	position={x: 500, y: 500}, 
                relative={ref: state0, where: {left: true, right: false, above: false, below: false}}, 
                accepting=false, 
                initial=true,
                label=""){ 
		this.name = name;
		this.position = position; 
		this.relative = relative;
		this.accepting = accepting;
		this.initial = initial;
       	        this.label = label; 
	} 

	draw(svg) { 
		this.outer = svg.circle(40, {
			cx : this.position.x, 
			cy : this.position.y,
			stroke: "black",
			fill: "none"});
		
		this.inner = svg.circle(30, { 
			cx : this.position.x, 
			cy : this.position.y, 
			stroke: "black", 
			fill: "none"});

		this.figure = svg.group();
		this.figure.add(this.outer);
		if (this.accepting) {this.figure.add(this.inner);}
	}
}

class Transition {
	constructor(from = state0,
		    to=[], 
		    args=[],
		    bend="",
		    label=""){
		this.from = from;
		this.to = to;
		this.args = args;
		this.bend = bend;
		this.label = label;
    }
    
    figure() {
        var line;
        if (transition.to === transition.from) {
            line = new fabric.Circle({
                radius: RADIUS,
                left: transition.to.position.x + RADIUS + ARROWSIZE,
                top: transition.to.position.y + RADIUS,
                angle: 45,
                startAngle: Math.PI * 3 / 2,
                endAngle: Math.PI,
                stroke: '#000',
                strokeWidth: 3,
                fill: ''
            });

            context.beginPath();
            context.arc(transition.to.position.x + RADIUS + ARROWSIZE, transition.to.position.y + RADIUS, RADIUS, Math.PI*3/2, Math.PI);
            context.stroke();
            draw_arrowhead(context, { x : transition.to.position.x + 2 * RADIUS, y : transition.to.position.y }, { x : transition.to.position.x + RADIUS + ARROWSIZE, y : transition.to.position.y }, ARROWSIZE);
        } else {
            context.beginPath();
            var angle;
            var x;
            var y;
            angle = Math.atan2(transition.to.position.y - transition.from.position.y, transition.to.position.x - transition.from.position.x)
            x = transition.to.position.x - (RADIUS + ARROWSIZE) * Math.cos(angle);
            y = transition.to.position.y - (RADIUS + ARROWSIZE) * Math.sin(angle);
            context.moveTo(x, y);
            x = transition.from.position.x + (RADIUS + ARROWSIZE) * Math.cos(angle);
            y = transition.from.position.y + (RADIUS + ARROWSIZE) * Math.sin(angle);
            context.lineTo(x, y);
            context.stroke();
            draw_arrowhead(context, transition.to.position, { x: x, y: y }, ARROWSIZE);
        }
    }
}

class Finite_Automaton { 
	constructor(alphabet=["0", "1"], states=[], transitions=[]){ 
		this.alphabet = alphabet; 
		this.states = states; 
		this.transitions = transitions;
	} 

    addNode(name = "0",
            relative = { ref: state0, where: { left: true, right: false, above: false, below: false } },
            accepting = false,
            initial = true,
            label = "") { 
	    let position = { x: 0, y: 0 } 
	    if (relative.where.left) position.x = -1; 
	    if (relative.where.right) position.x = 1; 
	    if (relative.where.above) position.y = -1; 
	    if (relative.where.below) position.y = 1; 
	    let len = Math.sqrt(position.x * position.x + position.y * position.y); 
	    position.x = ARROWLENGTH * position.x / len + relative.ref.position.x 
	    position.y = ARROWLENGTH * position.y / len + relative.ref.position.y 
	    let node = new State(name, position, relative, accepting, initial, label) 
	    this.states.push(node); 
    } 

	addArrow(transition) {
		this.transitions.push(transition)
	}
}

class DFA extends Finite_Automaton {
}
