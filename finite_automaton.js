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

	figure() {
		if (this.accepting) {
			let innerCircle = new fabric.Circle({
				radius: 18, 
				left: 'center', 
				top: 'center',
				stroke: "#000000",
				strokeWidth: 2,
				fill: undefined
			});

			let outerCircle = new fabric.Circle({
				radius: 20, 
				left: 'center',
				top: 'center',
				stroke: "#000000",
				strokeWidth: 2,
				fill: undefined
			});


			let figure = new fabric.Group([ outerCircle, innerCircle ], {
				left: this.position.x,
				top: this.position.y
			});
			return figure;
		} else {
			let figure = new fabric.Circle({
				radius: 20,
				left: this.position.x,
				top: this.position.y,
				stroke: "#000000",
				strokeWidth: 2,
				fill: undefined
			});
			return figure;
		}
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
