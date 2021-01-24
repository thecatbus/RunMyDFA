class State { 
	constructor(name="0", 
               	position={x: 500, y: 500}, 
                relative={ref: state0, where: {left: true, right: false, above: false, below: false}}, 
                accepting=false, 
                label=""){ 
		this.name = name;
		this.position = position; 
		this.relative = relative;
		this.accepting = accepting;
       	        this.label = label; 
	} 

	isNotAnchor() {
		var notanchor = this.relative.where.left || this.relative.where.right || this.relative.where.above || this.relative.where.below;
		return notanchor; 
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
	constructor(alphabet=["0", "1"], states=[], transitions=[], initial=undefined){ 
		this.alphabet = alphabet; 
		this.states = states; 
		this.transitions = transitions;
		this.initial = initial;
	} 

    addNode(name = "0",
            relative = { ref: state0, where: { left: true, right: false, above: false, below: false } },
            accepting = false,
            label = "") {
	    let newposition = findposition(relative.ref, relative.where); 
	    let node = new State(name, newposition, relative, accepting, label)
        this.states.push(node); 
        this.addArrow(new Transition(node, node, [], "loop below", "hi"));
        this.addArrow(new Transition(relative.ref, node, [], "", "bye"));
	    return node;
	} 

	addArrow(transition) {
		this.transitions.push(transition)
	}
}

class DFA extends Finite_Automaton {
}

const ABOVE = {left: false, right: false, above: true, below: false};
const BELOW = {left: false, right: false, above: false, below: true};
const LEFT = {left: true, right: false, above: false, below: false};
const RIGHT = {left: false, right: true, above: false, below: false};
const ABOVELEFT = {left: true, right: false, above: true, below: false};
const ABOVERIGHT = {left: false, right: true, above: true, below: false};
const BELOWLEFT = {left: true, right: false, above: false, below: true};
const BELOWRIGHT = {left: false, right: true, above: false, below: true};

const LOCATIONS = [ABOVE, BELOW, LEFT, RIGHT, ABOVELEFT, ABOVERIGHT, BELOWLEFT, BELOWRIGHT];
