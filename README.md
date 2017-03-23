# resul-ts

* TypeScript needs a Result // Either type.
* This is it, but without a lot of the niceities. For now.
* MIT License.
* Pull requests welcome. Any contributed code is assumed to be MIT licensed.

You could look in `src/test/basic.test.ts` to see examples of basic usage, but it would probably take longer than reading and understand than the actual code, which is in `src/index.ts`.

This library enforces the opinion that all errors must include a message that describes the error, not necessarily for end user consumption, but for logging or to help communication with team members.

It is idiomatic to import this library in the following way:

```ts
import * as r from 'resul-ts';
```

It is recommended that any exposed interface that returns data also names its Result type, like so:

```ts
export type FetchResult = r.Result<BigDatas, DatabaseError>;

export async function fetch_a_whole_bunch() : FetchResult {
  // ...
}
```

This allows users of the interface to be a bit more terse. Oh, and by the way, usage of the above functions would look like this:

```ts
let res = fetch_a_whole_bunch();

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
```
