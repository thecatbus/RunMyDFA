const ARROWSIZE = 10;

const workspace = document.getElementById('workspace');
const ctx = workspace.getContext('2d');

ctx.fillStyle = "#00FF00";
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
        console.log({ x: transition.to.position.x + 2 * transition.to.radius, y: transition.to.position.y + 2 * transition.to.radius })
        context.beginPath();
        context.arc(transition.to.position.x + transition.to.radius, transition.to.position.y, transition.to.radius, Math.PI*5/4., Math.PI*3/4.);
        // context.arcTo(transition.)
        context.stroke();
        draw_arrowhead(context, { x : transition.to.position.x + 2 * transition.to.radius, y : transition.to.position.y }, { x : transition.to.position.x + transition.to.radius, y : transition.to.position.y }, ARROWSIZE);
    } else {
        context.beginPath();
        context.moveTo(transition.from.position.x, transition.from.position.y);
        context.lineTo(transition.to.position.x, transition.to.position.y);
        context.stroke();
        draw_arrowhead(context, transition.to.position, transition.from.position, ARROWSIZE);
    }
}

function draw_state(context, state) {
    context.beginPath();
    context.arc(state.position.x, state.position.y, state.radius, 0, 2 * Math.PI);
    context.stroke();
}

function draw_DFA(context, dfa) {
    dfa.transitions.forEach(transition => {
        draw_transition(context, transition);
    });
    dfa.states.forEach(state => {
        draw_state(context, state);      
    })
}

// draw_DFA(ctx, dfa);
