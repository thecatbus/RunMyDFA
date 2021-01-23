window.addEventListener("load", () =>{
	const workspace = document.getElementById("workspace");
	const ctx = workspace.getContext("2d");

	myDFA = new Finite_Automaton();
	state0 = new State(name = "0", position = {x: workspace.width /2, y: workspace.height /2}, (0, "none"), false, true, "", 25, []);
	myDFA.addNode(state0);

	updateDFA(myDFA);

	console.log(tex(myDFA));

	draw_DFA(ctx, myDFA);

	window.addEventListener("resize", () =>{
		workspace.height = window.innerHeight;
		workspace.width = window.innerWidth;
	});
});

function updateDFA(dfa) {
	state1 = new State("1", { x: 500, y: 500 }, (0, "none"), false, false, "1", 50, []);
	state2 = new State("2", { x: 750, y: 250 }, (0, "none"), false, false, "2", 50, []);

	dfa.addNode(state1);
	dfa.addNode(state2);

	transition00 = new Transition(state0, state0, ["0"], "", "0");
	transition01 = new Transition(state0, state1, ["1"], "", "0");
	transition12 = new Transition(state1, state2, ["0"], "", "0");
	transition10 = new Transition(state1, state0, ["1"], "", "1");
	transition21 = new Transition(state2, state1, ["0"], "", "0");
	transition22 = new Transition(state2, state2, ["1"], "", "1");

	console.log(transition22.from.name);
	dfa.addArrow(transition00);
	dfa.addArrow(transition10);
	dfa.addArrow(transition01);
	dfa.addArrow(transition12);
	dfa.addArrow(transition21);
	dfa.addArrow(transition22);
}
