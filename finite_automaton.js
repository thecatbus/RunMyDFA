class State { 
	constructor(name="0", 
            	    position={x: 500, y: 500}, 
		    relative={ref: state0, where: "left"}, 
		    accepting=false, 
		    initial=true,
            	    label="", 
		    transitions=[]){ 
		this.name = name;
		this.position = position; 
		this.relative = relative;
		this.accepting = accepting;
		this.initial = initial;
        	this.label = label;
		this.transitions = transitions; 
	} 

	draw(ctx) {
		ctx.strokeStyle = "#000000";
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 25, 0, 2 * Math.PI);

		if (this.accepting) {
			ctx.arc(this.position.x, this.position.y, 22, 0, 2 * Math.PI);
		}

		ctx.stroke();
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
}

class Finite_Automaton { 
	constructor(alphabet=["0", "1"], states=[], transitions=[]){ 
		this.alphabet = alphabet; 
		this.states = states; 
		this.transitions = transitions;
	} 

	addNode(node) { 
		this.states.push(node); 
	} 

	addArrow(transition) {
		this.transitions.push(transition)
	}
}

class DFA extends Finite_Automaton {
}
