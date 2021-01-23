class State { 
	constructor(name=0, 
		    position=(0, 0), 
		    relative=(0, "left"), 
		    accepting=false, 
		    initial=false,
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
		    to=0, 
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
		this.states.append(node); 
	} 

	addArrow(transition) {
		this.transitions.append(transition)
	}
}

class DFA extends Finite_Automaton {
}
