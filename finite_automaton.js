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

	figure() {
		let innerCircle = new fabric.Circle({
			radius: 18, 
			left: 'center', 
			top: 'center' 
		});

		let outerCircle = new fabric.Circle({
			radius: 20, 
			left: 'center',
			top: 'center',
			borderColor: "#000000",
			hasBorders: true,
			fill: 'red'
		});

		let figure = new fabric.Group([outerCircle], {
			left: this.position.x,
			top: this.position.y
		});

		if (this.accepting) {
			figure.add(innerCircle);
		}

		return figure;
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

    addNode(name = "0",
            relative = { ref: state0, where: { left: true, right: false, above: false, below: false } },
            accepting = false,
            initial = true,
            label = "") {
        let position = { x: 0, y: 0 }
        if (relative.left) position.x = -1;
        if (relative.right) position.x = 1;
        if (relative.above) position.y = -1;
        if (relative.below) position.y = 1;
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
