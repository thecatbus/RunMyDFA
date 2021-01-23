window.addEventListener("load", () =>{
	const workspace = document.getElementById("workspace");
	const ctx = workspace.getContext("2d");

	myDFA = new Finite_Automaton();
	init = new State(name = 0, position = {x: workspace.width /2, y: workspace.height /2}, (0, "none"), false, true, "", 25, []);
	myDFA.addNode(init);

	draw_DFA(ctx, myDFA);

	window.addEventListener("resize", () =>{
		workspace.height = window.innerHeight;
		workspace.width = window.innerWidth;
	});
});
