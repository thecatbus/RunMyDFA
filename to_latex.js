function preamble() {
	code = `

	\\usepackage{tikz} 

	\\newenvironment{tikzautomata}{
		  \\begin{tikzpicture}[
			      baseline = (current bounding box.north),
			        > = stealth,
			        shorten > = 1pt,
			        auto,
			        node distance = 2cm,
			        on grid,
			        semithick
			        ]
		      \\tikzstyle{every state}=[
			            draw = black,
			            thick,
			            fill = white,
			            minimum size = 5mm
			            ]}
	    {\\end{tikzpicture}}

	    `;

	return code;
}

function node_tex(node) {
	code = "\\node[state";

	if (node.initial) {
		code += ", initial";
	}

	if (node.accepting) {
		code += ", accepting";
	}

	code += "] (" + (node.name) + ") ";

	if (!node.initial) {
		code += "[" + node.relative.where + " of=" + node.relative.ref.name + "] ";
	}

	code += "{" + node.label + "};";

	return code;
}

function arrow_tex(arrow) {
	code = "(" + arrow.from.name + ") edge [" + arrow.bend + "] {" + arrow.label + "} "; 

	if (arrow.from.name != arrow.to.name) {
		code += "(" + arrow.to.name + ")";
	} else {
		code += "()";
	}

	return code;
}

function tex(automaton) {
	code = "\\begin{tikzautomata} \n";

	for (node of automaton.states) {
		code += node_tex(node) + "\n";
	}

	if (automaton.transitions.length != 0) { 
		code += "\\path[->] \n"; 

		for (arrow of automaton.transitions) { 
			code += arrow_tex(arrow) + "\n";
		}

		code += ";"
	}

	code += "\n \\end{tikzautomata}";

	return code;
}
