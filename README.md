# Morilib Commons JS

Morilib Commons JS is JavaScript utiltiy functions.

## Example

```javascript
const C = Commons();

// returns 27 and logs 27
// This is useful in debugging.
C.$(27);

// throws Error
C.error("Invalid option");

// comparison
C.eqv(1, 1, 1, 1);   // true
C.eqv(1, 1, 1, 2);   // false
C.gt(3, 2, 1);       // true
C.gt(3, 2, 2);       // false
C.ge(3, 2, 1);       // true
C.ge(3, 2, 2);       // true

// arithmetic functions
C.add(1, 2, 3);      // 6
C.add();             // 0
C.multiply(1, 2, 4); // 8
C.multiply();        // 1
C.subtract(1, 2, 3); // -5
C.subtract(1);       // -1
C.divide(1, 2, 4);   // 0.125
C.divide(2);         // 0.5

// mathematical functions
C.sin(0);            // 0
C.cos(0);            // 1
C.tan(0);            // 0
C.max(1, 2, 3);      // 3
C.min(1, 2, 3);      // 1
C.sinc(0);           // 0
C.sinc(2);           // 0.45464871341

// Iverson bracket
// https://en.wikipedia.org/wiki/Iverson_bracket
C.iverson(1 === 1);  // 1
C.iverson(1 === 2);  // 0
C.iv(true);          // 1

// set operation of predicate
const set1 = (x, y) => x > -1 && x < 1 && y > -1 && y < 1;
const set2 = (x, y) => x >= 0 && x <= 1 && y >= 0 && y <= 1;
const set3 = (x, y) => Math.sqrt(x * x + y * y) <= 1;

const union = C.union(set1, set2, set3);
union(1, 1);         // true
union(0, 0);         // true
union(2, 2);         // false

const intersect = C.intersect(set1, set2, set3);
intersect(1, 1);     // false
intersect(0, 0);     // true
intersect(2, 2);     // false

const except = C.except(set1, set2, set3);
except(0, 0);        // false
except(0.9, 0.9);    // false
except(-0.1, -0.1);  // false
except(-0.9, -0.9);  // true

const xor = C.xor(set1, set2, set3);
xor(1, 1);           // true
xor(0.99, 0.99);     // false
xor(-0.99, -0.99);   // true
xor(-0.1, -0.1);     // false

// fixed combinator
const frac = C.fixed(
    (s, iter) => x => iter(1, 1, x),
    (s, iter) => (product, counter, maxCount) =>
        C.gt(counter, maxCount)
        ? product
        : iter(C.multiply(counter, product), C.add(counter, 1), maxCount));
frac(10);            // 3628800
```

