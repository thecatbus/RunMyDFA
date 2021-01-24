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
		    to=state0, 
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
