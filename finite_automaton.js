class State {
    constructor(position=(0, 0), label="", transitions=[]){
        this.position = position;
        this.label = label;
        this.transitions = transitions;
    }
}

class Finite_Automaton {
    constructor(alphabet=["0", "1"], states=[]){
        this.alphabet = alphabet;
        this.states = states;
    }

    addNode(node) {
        this.states.append(node);
    }
}

class DFA extends Finite_Automaton {
}