var height = window.innerHeight;
var width = window.innerWidth;
var namecounter = 0;

var draw = SVG().addTo('body').size(2000,2000)
var panel = SVG().addTo('#overlay').size(width*3/10,height)

state0 = new State("0", {x: 500, y: 500}, (0, {left: false, right: false, above: false, below: false}), false, "", 25, []);
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
