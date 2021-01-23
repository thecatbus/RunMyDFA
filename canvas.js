window.addEventListener("load", () =>{
	const workspace = document.getElementById("workspace");
	const ctx = workspace.getContext("2d");

	myDFA = new Finite_Automaton();
	console.log(myDFA);

	draw_DFA(ctx, myDFA);

	window.addEventListener("resize", () =>{
		workspace.height = window.innerHeight;
		workspace.width = window.innerWidth;
	});
});
