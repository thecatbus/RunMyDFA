window.addEventListener("load", () =>{
	var draw = SVG().addTo('body').size(1000, 800)

	state0 = new State("0", {x: 500, y: 400}, (0, "none"), false, true, "", 25, []);
	myDFA = new Finite_Automaton(["0", "1"], [state0]);
	
	// draw_DFA(myDFA, draw);

	myDFA = updateDFA(myDFA, state0);
	console.log(myDFA);
	draw_DFA(myDFA, draw);

});

function updateDFA(dfa, state0) {
	state2 = dfa.addNode("2", { ref: state0, where: { right: true, below: true } }, false, false, "2", 50, []);
	state1 = dfa.addNode("1", { ref: state2, where: { right: true, above: true } }, false, false, "1", 50, []);

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

	return dfa
}
