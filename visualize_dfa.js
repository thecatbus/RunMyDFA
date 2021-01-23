const workspace = document.getElementById('workspace');
const ctx = workspace.getContext('2d');

function draw_arrowhead(context, from, to, radius) {
    var x_center = to.x;
    var y_center = to.y;

    var angle;
    var x;
    var y;

    context.beginPath();

    angle = Math.atan2(to.y - from.y, to.x - from.x)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    context.moveTo(x, y);

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    context.lineTo(x, y);

    angle += (1.0 / 3.0) * (2 * Math.PI)
    x = radius * Math.cos(angle) + x_center;
    y = radius * Math.sin(angle) + y_center;

    context.lineTo(x, y);

    context.closePath();

    context.fill();
}

function draw_transition(context, transition) {
    if (transition.to === transition.from) {
        context.arc(transition.to.position[0] + transition.to.radius, transition.to.position[1], transition.to.radius, Math.PI*5/4., Math.PI*3/4.)
        draw_arrowhead(context, (transition.to.position[0] + 2 * transition.to.radius, transition.to.position[1] + 2 * transition.to.radius), (transition.to.position[0] + transition.to.radius, transition.to.position[1] + transition.to.radius), Math.PI/2.)
    } else {
        context.moveTo(transition.from.position[0], transition.from.position[1]);
        context.lineTo(transition.to.position[0], transition.to.position[1]);
        draw_arrowhead(context, transition.to.position, transition.from.position, Math.PI/2.);
    }
}

function draw_state(context, state) {
    context.arc(state.position[0], state.position[1], state.radius, 0, 2*Math.PI);
}

function draw_DFA(context, dfa) {
    dfa.transitions.forEach(transition => {
        draw_transition(context, transition);
    });
    dfa.states.forEach(state => {
        draw_state(context, state);      
    })
}

state0 = new State(0, [50, 50], (0, "none"), true, true, "0", 5, []);
state1 = new State(1, [100, 50], (0, "none"), false, false, "1", 5, []);
state2 = new State(2, [150, 50], (0, "none"), false, false, "2", 5, []);

transition00 = new Transition(state0, state0, ["0"], "", "0");
transition01 = new Transition(state0, state1, ["1"], "", "0");
transition12 = new Transition(state1, state2, ["0"], "", "0");
transition10 = new Transition(state1, state0, ["1"], "", "1");
transition21 = new Transition(state2, state1, ["0"], "", "0");
transition22 = new Transition(state2, state2, ["1"], "", "1");

dfa = new DFA(["0", "1"], [state0, state1, state2], [transition00, transition01, transition12, transition10, transition21, transition22]);

draw_DFA(ctx, dfa);