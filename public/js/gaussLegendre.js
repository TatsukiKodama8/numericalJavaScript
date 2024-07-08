import * as mc from './mathconst.mjs';
import * as mu from './mathutil.mjs';

const EPS = 3.0e-11;
/* ========== main ========= */
let x1 = -1, x2 = 1;
let num = 3;

// obtain zeroth and weight
let xZeroth = [], weight = [];
xZeroth = mu.gauLegWeight(x1, x2, num, EPS).zeroth;
weight  = mu.gauLegWeight(x1, x2, num, EPS).weight;

console.log(xZeroth);
console.log(weight);


const gauLegQuad = (func, xLower, xUpper, zeroth, weight) => {
    const xm = 0.5 * (xUpper + xLower);
    const xr = 0.5 * (xUpper - xLower);
    let s = 0;

    weight.forEach((w, j) => {
        let dx = xr * zeroth[j];
        s += w * func(xm + dx);  // 零点を一度だけ計算
    });

    return s * xr;
}


const f = x => 3*x*x;
let sol = gauLegQuad(f, 0, 1, xZeroth, weight);
console.log(sol);

