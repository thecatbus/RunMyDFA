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
		
		this.active = false;
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
	bendleft(){
		if (this.bend === "bend right") {
			this.bend = "";
		} else if (this.bend === "") {
			this.bend = "bend left";
		} else if (this.bend === "loop above") {
			this.bend = "loop right";
		} else if (this.bend === "loop right") {
			this.bend = "loop below";
		} else if (this.bend === "loop below") {
			this.bend = "loop left";
		} else if (this.bend === "loop left") {
			this.bend = "loop above";
		} else {}
	}

	bendright(){
		if (this.bend === "bend left") {
			this.bend = "";
		} else if (this.bend === "") {
			this.bend = "bend right";
		} else if (this.bend === "loop above") {
			this.bend = "loop left";
		} else if (this.bend === "loop left") {
			this.bend = "loop below";
		} else if (this.bend === "loop below") {
			this.bend = "loop right";
		} else if (this.bend === "loop right") {
			this.bend = "loop above";
		} else {}
	}

	switchlabels(string){
		this.label = string; 
		this.args = string.split(",");
    }
    
    del() {
        myDFA.transitions.splice(myDFA.transitions.indexOf(this));
    }
}

class Finite_Automaton { 
	constructor(states=[], transitions=[], initial=false){ 
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

	async begin(word = "") {
		this.states.forEach(state => { state.active = false; })
		if (this.initial) {
			this.initial.active = true;	
			refresh();				
			this.step(word);
		}
	}

	async step(word = "") {
		await sleep(1000);
		var newstates = [];
		if (word) {
			var sigma = word[0];
			console.log(sigma);
			word = word.slice(1);

			for(const transition of this.transitions) {
				if (transition.from.active && transition.label == sigma) {
					newstates.push(transition.to)
				}
			}			
			this.states.forEach(state => { state.active = false; });
			newstates.forEach(state => { state.active = true; });
			refresh();
			this.step(word);

		} else {
			var accepted = false;
			this.states.forEach(state => {
				if (state.active && state.accepting) {
					if (!accepted) {
						alert("Accepted");
						accepted = true;
					}
				}
			})
			if (!accepted) alert("Not Accepted");
		}
	}
}

function sleep(ms) {
	return new Promise(r => setTimeout(r, ms));
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
