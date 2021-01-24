function preamble() {
	code = `

\\usepackage{tikz} 
\\usetikzlibrary {arrows.meta,automata,positioning}


\\newenvironment{tikzautomata}{
	  \\begin{tikzpicture}[
		      baseline = (current bounding box.north),
		        >= stealth,
		        shorten >= 1pt,
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

	if (myDFA.initial === node) {
		code += ", initial";
	}

	if (node.accepting) {
		code += ", accepting";
	}

	code += "] (" + (node.name) + ") ";

	if (node.isNotAnchor()) {
		where = "";
		if (node.relative.where.above) where += "above ";
		if (node.relative.where.below) where += "below ";
		if (node.relative.where.right) where += "right ";
		if (node.relative.where.left) where += "left ";
		code += "[" + where + "=of " + node.relative.ref.name + "] ";
	}

	code += "{" + node.label + "};";

	return code;
}

function arrow_tex(arrow) {
	code = "(" + arrow.from.name + ") edge [" + arrow.bend + "] node "
	code += "{" + arrow.label + "} "; 
	code += "(" + arrow.to.name + ")";
		
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
