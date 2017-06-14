import { test } from 'ava';

import * as r from '../';

test(async function map_success_works(t) {
  t.plan(1);

  let success_value = 'WOW';

  // Normally one would define this result type
  // type GetStringResult = r.Result<string, void>

  function get_a_string() : r.Result<string, void> {
    return r.success(success_value);
  };

  let res = get_a_string();

  r.map(res, (result_if_success) => {
    t.is(result_if_success, success_value);
  });
});

test(async function map_success_with_return_works(t) {
  t.plan(1);

  let success_value = 'WOW';

  // Normally one would define this result type
  // type GetStringResult = r.Result<string, void>

  function get_a_string() : r.Result<string, void> {
    return r.success(success_value);
  };

  let res = get_a_string();

  function get_length_of_string(st:string):number {
    return st.length;
  }

  let length_if_success = r.map(res, get_length_of_string);

  if (r.is_ok(length_if_success)) {
    // TypeScript can infer that length_if_success.result is a number
    t.is(length_if_success.result, success_value.length);
  }
});

interface ComplexErrorType {
  a:number;
  b:string;
}

test(async function map_failure_works(t) {
  t.plan(2);

  let error_message = `DANG, we can't get the string`;
  let error_object:ComplexErrorType = {
    a: 5,
    b: 'oh no',
  };

  // Normally one would define this result type
  // type GetStringResult = r.Result<string, void>

  function get_a_string() : r.Result<string, ComplexErrorType> {
    return r.error(error_message, error_object);
  };

  let res = get_a_string();

  function get_length_of_string(st:string):number {
    return st.length;
  }

  let length_if_success:r.Result<number, ComplexErrorType>
      = r.map(res, get_length_of_string);

  if (r.is_fail(length_if_success)) {
    t.is(length_if_success.message, error_message);
    t.deepEqual(length_if_success.error, error_object);
  }
});

test(async function eq_works(t) {
  t.plan(3);

  function could_go_wrong() : r.Result<number, void> {
    return r.success(10);
  };

  let res = could_go_wrong();

  t.truthy(r.eq(res, 10), 'eq works');
  t.truthy(r.eq(res, <number><any>'10'), 'eq works');
  t.falsy(r.eq(res, 11), 'eq works');
});

test(async function eq_strict_works(t) {
  t.plan(3);

  function could_go_wrong() : r.Result<number, void> {
    return r.success(10);
  };

  let res = could_go_wrong();

  t.truthy(r.eq_strict(res, 10), 'eq_strict works');
  t.falsy(r.eq_strict(res, <number><any>'10'), 'eq_strict works');
  t.falsy(r.eq_strict(res, 11), 'eq_strict works');
});


test(async function eqs_false_works(t) {
  t.plan(6);

  function could_go_wrong() : r.Result<number, void> {
    return r.fail('oh no');
  };

  let res = could_go_wrong();

  t.falsy(r.eq(res, 10), 'eq_strict false on error');
  t.falsy(r.eq(res, <number><any>'10'), 'eq_strict false on error');
  t.falsy(r.eq(res, 11), 'eq_strict false on error');
  t.falsy(r.eq_strict(res, 10), 'eq_strict false on error');
  t.falsy(r.eq_strict(res, <number><any>'10'), 'eq_strict false on error');
  t.falsy(r.eq_strict(res, 11), 'eq_strict false on error');
});
