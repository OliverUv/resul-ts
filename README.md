# resul-ts

Do sometimes wish that functions would declare their failure modes in their type signatures? Do you wish you could read code and assume that the control flow is what it looks like? Or do you simply wish that exceptional control flow was used for truly exceptional and unforeseen circumstances only? You are not alone.

* TypeScript needs a Result // Either type.
* This is it.
* MIT License.
* Pull requests welcome.
* Any contributed code is assumed to be MIT licensed.

Look in `src/test/basic.test.ts` to see examples of basic usage. There is also `src/test/basic.test.ts` which tests and shows use of the convenience functions.

This library enforces the opinion that all errors must include a message that describes the error, not necessarily for end user consumption, but for logging or to help communication with team members.

It is idiomatic to import this library in the following way:

```ts
import * as r from 'resul-ts';
```

It is recommended that any exposed interface that returns data also names its Result type, like so:

```ts
export type FetchResult = r.Result<BigDatas, DatabaseError>;

export async function fetch_a_whole_bunch() : Promise<FetchResult> {
  // ...
}
```

Usage of the above functions would look like this:

```ts
let res = await fetch_a_whole_bunch();

if (r.is_ok(res)) {
  // TS understands that res.result will be a BigDatas here
}

if (r.is_success<BigDatas>(res)) {
  // TS understands that res.result will be a BigDatas here
}

// This plain isn't allowed. Thanks, TS!
if (r.is_success<boolean>(res)) {
  // Nu uh. No!
}

// Early exit patterns work nicely with TS type inference
function handle_result(res:FetchResult) {
  if (r.is_fail(res)) {
    console.log(`oh no: ${res.message}`)
    return;
  }
  // res is inferred to be a success here
  console.log(`Hooray: ${res.result}`)
}
```

There are some convenience functions:

```ts
let success_value = 'WOW';

function get_a_string() : r.Result<string, void> {
  return r.success(success_value);
};

let res = get_a_string();

function get_length_of_string(st:string):number {
  return st.length;
}

// You can map
let length_if_success = r.map(res, get_length_of_string);

if (r.is_ok(length_if_success)) {
  // TypeScript can infer that length_if_success.result is a number
  // length_if_success.result is 3 here
}

// You can also use `map_over` to do the same thing on a list of results.

// You can eq
let is_three = r.eq(length_if_success, 3); // true
is_three = r.eq(length_if_success, 4); // false

// Doing eq with a failure will always return false
// eq uses`==` comparison
// You can also do eq_strict for `===` comparison
```
