import { test } from 'ava';

import * as r from '../';

test(async function basic_success_works(t) {
  t.plan(1);

  let success_value = 'WOW';

  // Normally one would define this result type
  // type GetStringResult = r.Result<string, void>

  function get_a_string() : r.Result<string, void> {
    return r.success(success_value);
  };

  let res = get_a_string();

  // if (r.is_ok(res)) {
  if (r.is_ok(res)) {
    // TS compiler doesn't let us get the res.result unless we use the r.is_ok
    // or r.is_success functions first
    t.is(res.result, success_value, 'Success value successfully passed');
  }
});

test(async function basic_error_works(t) {
  t.plan(2);

  let error_message = `DANG, we can't get the string`;
  let error_object = 7;

  function get_a_string() : r.Result<string, number> {
    return r.error(error_message, error_object);
  };

  let res = get_a_string();

  if (r.is_fail(res)) {
    // TS compiler doesn't let us get the res.error or res.message unless we
    // use the r.is_ok or r.is_success functions first
    t.is(res.message, error_message, 'Result error message is proper.');
    t.is(res.error, error_object, 'Result error object is proper.');
  }
});

// The r.Res type is an alias for r.Result<void, void>. Use it
// when you just want to force a failure to report an error message.

test(async function fail_works(t) {
  t.plan(1);

  let error_message = 'it all went bonkers';

  function could_go_wrong() : r.Res {
    return r.fail(error_message);
  };

  let res = could_go_wrong();

  if (r.is_fail(res)) {
    t.is(res.message, error_message, 'Result error message is proper.');
  }
});

test(async function ok_works(t) {
  t.plan(1);

  function could_go_wrong() : r.Res {
    return r.ok();
  };

  let res = could_go_wrong();

  t.truthy(r.is_ok(res), 'ok result is_ok');
});
