/*
 * This source code is under the Unlicense
 */
function Commons(opt) {
    const undef = void 0;
    const outputLog = opt && opt.log ? opt.log : console.log;
    const random = opt && opt.random ? opt.random : Math.random;

    function $(x) {
        outputLog(x);
        return x;
    }

    function error(message, anObject) {
        if(anObject === undef) {
            throw new Error(message);
        } else {
            throw new Error(message + ": " + anObject);
        }
    }

    function compare(f, args) {
        if(args.length === 0) {
            return true;
        } else {
            let tobe = args[0];

            for(let i = 1; i < args.length; tobe = args[i++]) {
                if(!f(tobe, args[i])) {
                    return false;
                }
            }
            return true;
        }
    }

    const eqv = (...args) => compare((x, y) => x === y, args);
    const ne = (...args) => args.length < 2 || !eqv(...args);
    const gt = (...args) => compare((x, y) => x > y, args);
    const ge = (...args) => compare((x, y) => x >= y, args);
    const lt = (...args) => compare((x, y) => x < y, args);
    const le = (...args) => compare((x, y) => x <= y, args);

    const add = (...args) => args.reduce((x, y) => x + y, 0);
    const multiply = (...args) => args.reduce((x, y) => x * y, 1);

    function subtract(...args) {
        return args.length === 0
               ? 0
               : args.length === 1
               ? -args[0]
               : args.slice(1).reduce((x, y) => x - y, args[0]);
    }

    function divide(...args) {
        return args.length === 0
               ? 1
               : args.length === 1
               ? 1 / args[0]
               : args.slice(1).reduce((x, y) => x / y, args[0]);
    }

    const square = x => x * x;
    const sin = x => Math.sin(x);
    const cos = x => Math.cos(x);
    const tan = x => Math.tan(x);
    const asin = x => Math.asin(x);
    const acos = x => Math.acos(x);
    const atan = (x, y) => y === undef ? Math.atan(x) : Math.atan2(x, y);
    const sinh = x => Math.sinh(x);
    const cosh = x => Math.cosh(x);
    const tanh = x => Math.tanh(x);
    const asinh = x => Math.asinh(x);
    const acosh = x => Math.acosh(x);
    const atanh = x => Math.atanh(x);
    const exp = x => Math.exp(x);
    const log = x => Math.log(x);
    const log10 = x => Math.log10(x);
    const log2 = x => Math.log2(x);
    const abs = x => Math.abs(x);
    const ceil = x => Math.ceil(x);
    const floor = x => Math.floor(x);
    const max = (...xs) => Math.max(...xs);
    const min = (...xs) => Math.min(...xs);
    const pow = (x, y) => Math.pow(x, y);
    const sqrt = x => Math.sqrt(x);
    const sinc = x => x === 0 ? 1 : sin(x) / x;

    const iverson = boolValue => boolValue ? 1 : 0;

    function union(...sets) {
        return function(...args) {
            for(let i = 0; i < sets.length; i++) {
                if(sets[i](...args)) {
                    return true;
                }
            }
            return false;
        };
    }

    function intersect(...sets) {
        return function(...args) {
            for(let i = 0; i < sets.length; i++) {
                if(!sets[i](...args)) {
                    return false;
                }
            }
            return true;
        };
    }

    function except(...sets) {
        return sets.length > 0
               ? (...args) => sets[0](...args) && !union(...sets.slice(1))(...args)
               : error("At least one argument required");
    }

    function xor(...sets) {
        const xor2 = (x, y) => x && !y || !x && y;

        if(sets.length > 0) {
            return function(...args) {
                let result = sets[0](...args);

                for(let i = 1; i < sets.length; i++) {
                    result = xor2(result, sets[i](...args));
                }
                return result;
            }
        } else {
            error("At least one argument required");
        }
    }

    function fixed(...l) {
        const delays = [];
        const memo = [];

        for(let i = 0; i < l.length; i++) {
            (function(i) {
                delays.push(function(...args) {
                    if(!memo[i]) {
                        memo[i] = l[i].apply(null, delays);
                    }
                    return memo[i].apply(null, args);
                });
            })(i);
        }
        return delays.at(0);
    }

    const me = {
        $: $,
        error: error,
        eqv: eqv,
        ne: ne,
        gt: gt,
        ge: ge,
        lt: lt,
        le: le,
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        square: square,
        sin: sin,
        cos: cos,
        tan: tan,
        asin: asin,
        acos: acos,
        atan: atan,
        sinh: sinh,
        cosh: cosh,
        tanh: tanh,
        asinh: asinh,
        acosh: acosh,
        atanh: atanh,
        exp: exp,
        log: log,
        log10: log10,
        log2: log2,
        abs: abs,
        ceil: ceil,
        floor: floor,
        max: max,
        min: min,
        pow: pow,
        sqrt: sqrt,
        sinc: sinc,
        iverson: iverson,
        iv: iverson,
        union: union,
        intersect: intersect,
        except: except,
        xor: xor,
        fixed: fixed
    };
    return me;
}

