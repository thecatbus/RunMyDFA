var height = window.outerHeight;
var width = window.outerWidth;
var namecounter = 0;

var draw = SVG().addTo('body').size(5000,5000);
var panel = SVG().addTo('#overlay').size(250,height);

state0 = new State("0", {x: 2500, y: 2500}, {ref: undefined, where: {left: false, right: false, above: false, below: false}}, false, "", 25, []);
myDFA = new Finite_Automaton([state0], [], state0);

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
