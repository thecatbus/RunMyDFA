class State { 
	constructor(name=0, 
            	    position={x: 500, y: 500}, 
		    relative=(0, "left"), 
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
}

class Transition {
	constructor(from=0,
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
