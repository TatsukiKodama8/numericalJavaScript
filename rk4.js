import * as mu from './mathutil.mjs';

/* constants */
const PI = Math.PI;

const f = (x, y) => { return [y[1], -y[0]]; }   // differential equation
const g = (x) => Math.cos(x);                   // exact solution

/* ========== main ========= */
let num = 1000;
let xMin = 0;
let xMax = 4.0;
let dx = (xMax - xMin) / num;
let x = xMin;       // initial x
let y = [1, 0];     // initial condition

for (let i = 0; i <= num; i++) {
    console.log(x.toExponential(3), y[0].toExponential(3), g(x).toExponential(3));
    y = mu.rk4(f, x, y, dx);
    x = xMin + (i + 1) * dx; // xを更新する
}
