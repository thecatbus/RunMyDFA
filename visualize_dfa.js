const ARROWSIZE = 10;
const RADIUS = 50;

const workspace = document.getElementById('workspace');
const ctx = workspace.getContext('2d');

ctx.fillStyle = "#000000";
ctx.strokeStyle = "#000000";
ctx.lineWidth = 3;

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
    console.log(transition.from.position[0], transition.from.position[1]);
    if (transition.to === transition.from) {
        console.log({ x: transition.to.position.x + 2 * RADIUS, y: transition.to.position.y + 2 * RADIUS })
        context.beginPath();
        context.arc(transition.to.position.x + RADIUS, transition.to.position.y + RADIUS, RADIUS, Math.PI*3/2, Math.PI);
        context.stroke();
        draw_arrowhead(context, { x : transition.to.position.x + 2 * RADIUS, y : transition.to.position.y }, { x : transition.to.position.x + RADIUS, y : transition.to.position.y }, ARROWSIZE);
    } else {
        context.beginPath();
        context.moveTo(transition.from.position.x, transition.from.position.y);
        context.lineTo(transition.to.position.x, transition.to.position.y);
        context.stroke();
        draw_arrowhead(context, transition.to.position, transition.from.position, ARROWSIZE);
    }
}

function draw_state(context, state) {
    ctx.strokeStyle = "#0000FF";
    context.beginPath();
    context.arc(state.position.x, state.position.y, RADIUS, 0, 2 * Math.PI);
    context.stroke();
    ctx.strokeStyle = "#000000";
}

function draw_DFA(context, dfa) {
    dfa.transitions.forEach(transition => {
        draw_transition(context, transition);
    });
    dfa.states.forEach(state => {
        draw_state(context, state);      
    })
}

state0 = new State(0, { x: 250, y: 250 }, (0, "none"), true, true, "0", []);
state1 = new State(1, { x: 500, y: 250 }, (0, "none"), false, false, "1", []);
state2 = new State(2, { x: 750, y: 250 }, (0, "none"), false, false, "2", []);

transition00 = new Transition(state0, state0, ["0"], "", "0");
transition01 = new Transition(state0, state1, ["1"], "", "0");
transition12 = new Transition(state1, state2, ["0"], "", "0");
transition10 = new Transition(state1, state0, ["1"], "", "1");
transition21 = new Transition(state2, state1, ["0"], "", "0");
transition22 = new Transition(state2, state2, ["1"], "", "1");

dfa = new DFA(["0", "1"], [state0, state1, state2], [transition00, transition01, transition12, transition10, transition21, transition22]);

draw_DFA(ctx, dfa);
