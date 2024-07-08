
/****************************
 *  DEFFERENTIAL EQUATION   *
 ****************************/

// 4th-order Runge-Kutta method
// Solve dy[i]/dx = func(x, y[0](x), y[1](x), ..., y[i], ...)
// Note that y and func() are array.
const rk4 = (func, x, y, dx) => {
    const halfDx = dx / 2;
    let k1      = func(x, y).map(value => value * dx);
    let yTemp1  = y.map((value, i) => value + k1[i] / 2);
    let k2      = func(x + halfDx, yTemp1).map(value => value * dx);
    let yTemp2  = y.map((value, i) => value + k2[i] / 2);
    let k3      = func(x + halfDx, yTemp2).map(value => value * dx);
    let yTemp3  = y.map((value, i) => value + k3[i]);
    let k4      = func(x + dx, yTemp3).map(value => value * dx);
    return y.map((value, i) => value + (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6);
};


/****************
 *  INTEGRATION *
 ****************/

// TODO
// 3rd-order Simpson method
const simpson = (func, lowerLimit, upperLimit, eps) => {
    return;
}

// TODO
// Gauss-Legendre quadrature
const gauLegWeight = (x1, x2, n, EPS) => {
    // map range x1 and x2 to -1 and 1
    let m = (n + 1.0)/2.0;
    xm = 0.5*(x2 + x1);
    xl = 0.5*(x2 - x1);

    //
    for (let i = 0; i <= m; i++) {
        let z = Math.cos(3.141592654*(i-0.25)/(n+0.5));
    }
}
const gauLegQuad = (func) => {
    return;
}

export { rk4, simpson, gauLegWeight, gauLegQuad};
