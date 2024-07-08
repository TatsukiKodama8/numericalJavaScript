import * as mu from './mathutil.mjs';

// constant
const GOLDEN_RATIO = 1.0+Math.sqrt(5)/2;

/* ========== main ========= */
// differential equation we want solve
const diffEqLotkaVolterra = (x, y) => {
    let [x1, x2] = [y[0], y[1]]; // temporal variable
    let dx1dt, dx2dt;
    // parameter controllig number of preys and predators.
    let a = 2/3;
    let b = 1/3
    let c = 1/2;
    let d = 1/2;
    dx1dt = a*x1 - b*x1*x2;
    dx2dt = c*x1*x2 - d*x2;
    return [dx1dt, dx2dt];
} 

// exact solution
const diffEqHarmonicOscillator = (x, y) => {
    let [z, dz] = [y[0], y[1]]; // temporal variable
    z   = y[1];
    dz  = -y[0];
    return [z, dz];
}

// need to plot
let xArr = [],                              
    yArrHarmOsc = [], dy1ArrHarmOsc = [],   
    xArrLV = [], yArrLV = [];               

//let num = 1000;
let xMin = 0;
let xMax = 30.0;
let dx  = 0.05;//= (xMax - xMin) / num;
let x   = xMin;       // initial x
let y1  = [1, 0];    // set initial condition for the Harmonic oscilator
let y2  = [1, 1];    // set initial condition for the Lotka-Volterra equation

while (x < xMax) {
    x    += dx; //= xMin + i * dx;
    y1   = mu.rk4(diffEqHarmonicOscillator, x, y1, dx);
    y2   = mu.rk4(diffEqLotkaVolterra, x, y2, dx);

    xArr.push(x);
    yArrHarmOsc.push(y1[0]);
    dy1ArrHarmOsc.push(y1[1]);
    xArrLV.push(y2[0]);
    yArrLV.push(y2[1]);
}

console.log(yArrHarmOsc);


/* ========== figures =========== */
// line depicted by Runge-Kutta
let plotHarmonicOscillator = {
    x: xArr,
    y: yArrHarmOsc,
    name: 'Harmonic Oscilator',
    line: {
        dash: 'solid', 
        color: 'rgb(55, 128, 191)',
        width: 3
    }
};

// Lotka-Volterra
let plotLotkaVolterraPrey = {
    x: xArr,
    y: xArrLV,
    name: "prey",
    line: {
        dash: 'solid', 
        color: 'rgb(219, 64, 82)',
        width: 3
    }
};

let plotLotkaVolterraPredator = {
    x: xArr,
    y: yArrLV,
    name: "predetor",
    line: {
        dash: 'solid', 
        color: 'green',
        width: 3
    }
};

// layout for the figure
var layout = {
    width: 800,
    height: this.width*GOLDEN_RATIO,
};

let data = [plotHarmonicOscillator, plotLotkaVolterraPrey, plotLotkaVolterraPredator];
Plotly.newPlot('plot', data, layout);
