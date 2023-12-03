/*
 * This source code is under the Unlicense
 */
const ContainerMonad = () => {
    const undef = void 0;
    const $bind = Symbol("bind");
    const $unit = Symbol("unit");
    const $inner = Symbol("inner");

    // Maybe monad
    class MaybeClass {
        static [$unit](v) {
            return new JustClass(v);
        }
    };

    class JustClass extends MaybeClass {
        constructor(v) {
            super();
            this._value = v;
        }

        [$bind](f) {
            return f(this._value);
        }

        get value() {
            return this._value;
        }

        getOrDefault(d) {
            return this._value;
        }

        get [Symbol.toStringTag]() {
            return "Just";
        }
    };

    class NothingClass extends MaybeClass {
        [$bind](f) {
            return this;
        }

        get value() {
            throw new Error("Nothing value can not gotten");
        }

        getOrDefault(d) {
            return d;
        }

        get [Symbol.toStringTag]() {
            return "Nothing";
        }
    };

    const Nothing = new NothingClass();
    const Just = value => new JustClass(value);

    // Either monad
    class EitherClass {
        get [Symbol.toStringTag]() {
            return "Either";
        }

        static [$unit](v) {
            return new RightClass(v);
        }
    }

    class RightClass extends EitherClass {
        constructor(v) {
            super();
            this._right = v;
        }

        [$bind](f) {
            return f(this._right);
        }

        get right() {
            return this._right;
        }

        get left() {
            throw new Error("Left value can not gotten");
        }

        get leftRight() {
            return [undef, this._right];
        }
    }

    class LeftClass extends EitherClass {
        constructor(v) {
            super();
            this._left = v;
        }

        [$bind](f) {
            return this;
        }

        get right() {
            throw new Error("Right value can not gotten");
        }

        get left() {
            return this._left;
        }

        get leftRight() {
            return [this._left, undef];
        }
    }

    const Right = v => new RightClass(v);
    const Left = v => new LeftClass(v);

    // Array monad
    Array.prototype[$bind] = function(f) {
        return this.flatMap(f);
    };
    Array[$unit] = function(v) {
        return [v];
    };

    // Generator monad
    const Generator = ((function*() {})()).constructor;
    Generator.prototype[$bind] = function*(f) {
        for(const v of this) {
            for(const w of f(v)) {
                yield w;
            }
        }
    }
    Generator[$unit] = function*(v) {
        yield v;
    }
    Generator[$inner] = function*(a, ctor, args, f) {
        if(a.length > 0) {
            yield* a[0][$bind](v => Generator[$inner](a.slice(1), ctor, args.concat([v]), f));
        } else {
            yield f.apply(null, args);
        }
    };

    // general functions
    const from = a => {
        let args = [a];
        const ctor = a.constructor;
        const inner0 = (a, ctor, args, f) => {
            if(a.length > 0) {
                return a[0][$bind](v => inner(a.slice(1), ctor, args.concat([v]), f));
            } else {
                return ctor[$unit](f.apply(null, args));
            }
        };
        const inner = ctor[$inner] ?? inner0;
        const select = f => inner(args, ctor, [], f);
        const selectGenerator = function*(f) {
            yield* inner(args, ctor, [], f);
        }
        const me = {
            from: a => {
                args.push(a);
                return me;
            },

            select: ctor === Generator ? selectGenerator : select
        };

        return me;
    };

    const me = {
        from: from,
        Maybe: MaybeClass,
        Just: Just,
        Nothing: Nothing,
        Either: EitherClass,
        Right: Right,
        Left: Left,
        bind: $bind,
        unit: $unit
    };

    return me;
};

