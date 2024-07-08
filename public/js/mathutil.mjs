import * as mc from './mathconst.mjs';


/****************************
 *  DEFFERENTIAL EQUATION   *
 ****************************/

// 4th-order Runge-Kutta method
// Solve dy[i]/dx = func(x, y[0](x), y[1](x), ..., y[i], ...)
// Note that y and func() are array.
export const rk4 = (func, x, y, dx) => {
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

// Gauss-Legendre quadrature
export const gauLegWeight = (x1, x2, n, EPS) => {
    // map range x1 and x2 to -1 and 1
    let m, i, j;
    let z1, z, xm, xl, pp, p3, p2, p1;
    let x = [], w = [];
    
    m = (n + 1)/2;
    xm = 0.5*(x2 + x1);
    xl = 0.5*(x2 - x1);
    for ( i = 1; i<=m; i++) {
        z = Math.cos(mc.PI*(i - 0.25)/(n + 0.5));
        do {                // Loop up recurrence relation to get the 
            p1 = 1.0;       // Legendre polynomial evaluated at z
            p2 = 0.0;
            for (  j = 1; j <= n; j++ ) {
                p3 = p2;
                p2 = p1;
                p1 = ( (2.0*j - 1.0)*z*p2 - (j - 1.0)*p3)/j;
            }
            pp = n*(z*p1 - p2)/(z*z - 1.0);
            z1 = z;
            z = z1 - p1/pp;
        } while ( (z - z1) > EPS );
        x[i] = xm - xl*z;
        x[n + 1 - i] = xm  + xl*z;
        w[i] = 2.0*xl/((1.0 - z*z)*pp*pp);
        w[n + 1 - i] = w[i];
    } 
    // eliminate first element
    x.shift();
    w.shift();
    return { "zeroth": x, "weight": w }
}
const gauLegQuad = (func) => {
    return;
}

//export { rk4, simpson, gauLegWeight, gauLegQuad};
