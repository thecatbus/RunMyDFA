var draw = SVG().addTo('body').size(1000, 800)
var namecounter = 0;

state0 = new State("0", {x: 500, y: 400}, (0, "none"), false, false, "", 25, []);
myDFA = new Finite_Automaton(["0", "1"], [state0], state0);

refresh();

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        refresh();
    }
};
