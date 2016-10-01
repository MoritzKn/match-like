# match-like
> Much nicer alternative to the `switch` statement inspired by
the `match` expression from [Rust](https://www.rust-lang.org)

Using match will make your code more readable and allow
you to use the immutable `const` *everywhere*.

## Install
```sh
npm install match-like
```

## Usage
```js
const match = require('match-like');

let returnValue = match(someValue, [
    [valueToMach1, valueToMach1, (match, matchIndex, allValue) =>
        someExpression],
    [() =>
        defaultExpression,
]);

```

## Syntax
```
match(value, [
    [valueToMach, ..., (match, matchIndex, allValue) => { ... }],
    ...
])
```

## Parameters
- **value**  
  Value of any type to match against.
- **checks**  
  Array of checks. All checks will be executed in order
  until the first match.
    - **check**  
      Array starting with n values and ending
      with a function as it's last element.
        - **value**  
          Values of any type to check against. If any of
          the values is equals (`===`) to the first value
          supplied to the `match` function, the `handler`
          will be executed. If zero values are supplied
          the `handler` will always be executed.
        - **handler**  
          Callback function, which will be executed if any
          of the values matches. The callback takes three
          optional arguments:
            - **match**
              The the matched element.
            - **matchIndex**
              The index of the matched value.
            - **allValue**
              Array with all values i.e. the `check` without
              the `handler`.

## Comparisons

### With match

```js
const match = require('match-like');

const num = 7;
const what = match(num, [
    [0, 2, 4, 6, 8, () => 'a even number'],
    [1, 3, 5, 7, 9, () => 'a odd number'],
    [() => 'unknown']
]);

console.log(`${num} is ${what}`);
// => 7 is a odd number
```

### With switch

```js
const num = 7;

let what;
switch (num) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 8:
        what = 'a even number';
        break;
    case 1:
    case 3:
    case 5:
    case 7:
    case 9:
        what = 'a odd number';
        break;
    default:
        what = 'unknown';
}

console.log(`${num} is ${what}`);
// => 7 is a odd number
```

### In Rust

```rust
let num = 7;
let what = match num {
    0 | 2 | 4 | 6 | 8 => "a even number",
    1 | 3 | 5 | 7 | 9 => "a odd number",
    _ => "unknown"
};

println!("{} is {}", num, what);
// => 7 is a odd number
```

### Example

```js
const match = require('match-like');

const now = new Date();
const day = now.getDay();

const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
const weekendDays = ['saturday', 'sunday'];

function getDayName(dayNum) {
    return match(dayNum, [
        [0, () => 'sunday'],
        [1, () => 'monday'],
        [2, () => 'tuesday'],
        [3, () => 'wednesday'],
        [4, () => 'thursday'],
        [5, () => 'friday'],
        [6, () => 'saturday'],
        [() => 'not a day'],
    ]);
}

match(getDayName(day), [
    [...workingDays, dayName =>
        console.log(`You should go to work, it's ${dayName}`)],
    [...weekendDays, dayName =>
        console.log(`It's ${dayName} and this means it's weekend`)],
]);
```
