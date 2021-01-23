window.addEventListener("load", () =>{
	var workspace = new fabric.Canvas("workspace");

	state0 = new State("0", {x: workspace.width /2, y: workspace.height /2}, (0, "none"), false, true, "", 25, []);
	myDFA = new Finite_Automaton(states=[state0]);
	myDFA.addNode(state0);

	// updateDFA(myDFA);

	draw_DFA(workspace, myDFA);

	console.log(workspace);
});

function updateDFA(dfa) {
	state1 = new State("1", {ref: state0, where: {right: true}}, false, false, "1", 50, []);
	state2 = new State("2", {ref: state0, where: {left: true}}, false, false, "2", 50, []);

	dfa.addNode(state1);
	dfa.addNode(state2);

	transition00 = new Transition(state0, state0, ["0"], "loop above", "0");
	transition01 = new Transition(state0, state1, ["1"], "", "0");
	transition12 = new Transition(state1, state2, ["0"], "", "0");
	transition10 = new Transition(state1, state0, ["1"], "", "1");
	transition21 = new Transition(state2, state1, ["0"], "", "0");
	transition22 = new Transition(state2, state2, ["1"], "loop below", "1");

	dfa.addArrow(transition00);
	dfa.addArrow(transition10);
	dfa.addArrow(transition01);
	dfa.addArrow(transition12);
	dfa.addArrow(transition21);
	dfa.addArrow(transition22);
}
