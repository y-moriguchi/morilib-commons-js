/*
 * This source code is under the Unlicense
 */
/*
 * This test case is described for Jasmine.
 */
describe("morilib-commons", function() {
    const C = Commons();

    function ok(actual, expected) {
        expect(actual).toEqual(expected);
    }

    function oknum(actual, expected) {
        expect(actual).toBeCloseTo(expected, 6);
    }

    beforeEach(function() {
    });

    describe("testing morilib-commons", function() {
        it("eqv", function() {
            ok(C.eqv(), true);
            ok(C.eqv(1), true);
            ok(C.eqv(1, 2, 3), false);
            ok(C.eqv(1, 2, 2), false);
            ok(C.eqv(3, 2, 1), false);
            ok(C.eqv(3, 2, 2), false);
            ok(C.eqv(1, 1, 1), true);
        });

        it("ne", function() {
            ok(C.ne(), true);
            ok(C.ne(1), true);
            ok(C.ne(1, 2, 3), true);
            ok(C.ne(1, 2, 2), true);
            ok(C.ne(3, 2, 1), true);
            ok(C.ne(3, 2, 2), true);
            ok(C.ne(1, 1, 1), false);
        });

        it("gt", function() {
            ok(C.gt(), true);
            ok(C.gt(1), true);
            ok(C.gt(1, 2, 3), false);
            ok(C.gt(1, 2, 2), false);
            ok(C.gt(3, 2, 1), true);
            ok(C.gt(3, 2, 2), false);
            ok(C.gt(1, 1, 1), false);
        });

        it("ge", function() {
            ok(C.ge(), true);
            ok(C.ge(1), true);
            ok(C.ge(1, 2, 3), false);
            ok(C.ge(1, 2, 2), false);
            ok(C.ge(3, 2, 1), true);
            ok(C.ge(3, 2, 2), true);
            ok(C.ge(1, 1, 1), true);
        });

        it("lt", function() {
            ok(C.lt(), true);
            ok(C.lt(1), true);
            ok(C.lt(1, 2, 3), true);
            ok(C.lt(1, 2, 2), false);
            ok(C.lt(3, 2, 1), false);
            ok(C.lt(3, 2, 2), false);
            ok(C.lt(1, 1, 1), false);
        });

        it("le", function() {
            ok(C.le(), true);
            ok(C.le(1), true);
            ok(C.le(1, 2, 3), true);
            ok(C.le(1, 2, 2), true);
            ok(C.le(3, 2, 1), false);
            ok(C.le(3, 2, 2), false);
            ok(C.le(1, 1, 1), true);
        });

        it("add", function() {
            ok(C.add(1, 2, 4), 7);
            ok(C.add(2), 2);
            ok(C.add(), 0);
        });

        it("multiply", function() {
            ok(C.multiply(1, 2, 4), 8);
            ok(C.multiply(2), 2);
            ok(C.multiply(), 1);
        });

        it("subtract", function() {
            ok(C.subtract(1, 2, 4), -5);
            ok(C.subtract(2), -2);
            ok(C.subtract(), 0);
        });

        it("divide", function() {
            ok(C.divide(1, 2, 4), 0.125);
            ok(C.divide(2), 0.5);
            ok(C.divide(), 1);
        });

        it("sin", () => oknum(C.sin(1), Math.sin(1)));
        it("cos", () => oknum(C.cos(1), Math.cos(1)));
        it("tan", () => oknum(C.tan(1), Math.tan(1)));
        it("asin", () => oknum(C.asin(1), Math.asin(1)));
        it("acos", () => oknum(C.acos(1), Math.acos(1)));
        it("atan", () => {
            oknum(C.atan(1), Math.atan(1))
            oknum(C.atan(2, 3), Math.atan2(2, 3))
        });
        it("sinh", () => oknum(C.sinh(1), Math.sinh(1)));
        it("cosh", () => oknum(C.cosh(1), Math.cosh(1)));
        it("tanh", () => oknum(C.tanh(1), Math.tanh(1)));
        it("asinh", () => oknum(C.asinh(1), Math.asinh(1)));
        it("acosh", () => oknum(C.acosh(1), Math.acosh(1)));
        it("atanh", () => oknum(C.atanh(0.5), Math.atanh(0.5)));
        it("exp", () => oknum(C.exp(1), Math.exp(1)));
        it("log", () => oknum(C.log(1), Math.log(1)));
        it("log10", () => oknum(C.log10(1), Math.log10(1)));
        it("log2", () => oknum(C.log2(1), Math.log2(1)));
        it("abs", () => oknum(C.abs(1), Math.abs(1)));
        it("ceil", () => oknum(C.ceil(1), Math.ceil(1)));
        it("floor", () => oknum(C.floor(1), Math.floor(1)));
        it("max", () => oknum(C.max(1, 2, 3), Math.max(1, 2, 3)));
        it("min", () => oknum(C.min(1, 2, 3), Math.min(1, 2, 3)));
        it("pow", () => oknum(C.pow(2, 3), Math.pow(2, 3)));
        it("sqrt", () => oknum(C.sqrt(1), Math.sqrt(1)));

        it("sinc", function() {
            oknum(C.sinc(2), Math.sin(2) / 2);
            oknum(C.sinc(0), 1);
        });

        const set1 = (x, y) => x > -1 && x < 1 && y > -1 && y < 1;
        const set2 = (x, y) => x >= 0 && x <= 1 && y >= 0 && y <= 1;
        const set3 = (x, y) => Math.sqrt(x * x + y * y) <= 1;

        it("union", function() {
            const union = C.union(set1, set2, set3);

            ok(union(1, 1), true);
            ok(union(0, 0), true);
            ok(union(2, 2), false);
        });

        it("intersect", function() {
            const intersect = C.intersect(set1, set2, set3);

            ok(intersect(1, 1), false);
            ok(intersect(0, 0), true);
            ok(intersect(2, 2), false);
        });

        it("except", function() {
            const except = C.except(set1, set2, set3);

            ok(except(0, 0), false);
            ok(except(0.9, 0.9), false);
            ok(except(-0.1, -0.1), false);
            ok(except(-0.9, -0.9), true);
        });

        it("xor", function() {
            const xor = C.xor(set1, set2, set3);

            ok(xor(1, 1), true);
            ok(xor(0.99, 0.99), false);
            ok(xor(-0.99, -0.99), true);
            ok(xor(-0.1, -0.1), false);
        });

        const frac = C.fixed(
            (s, iter) => x => iter(1, 1, x),
            (s, iter) => (product, counter, maxCount) =>
                C.gt(counter, maxCount)
                ? product
                : iter(C.multiply(counter, product), C.add(counter, 1), maxCount));
        it("fixed", () => ok(frac(10), 3628800));
    });
});
