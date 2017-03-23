import { test } from 'ava';

import * as r from '../';

test(async function fail_works(t) {
  t.plan(1);
  let error_message = 'it all went bonkers';
  let oh_no = function oh_no() : r.Res {
    return r.fail(error_message);
  }
  let res = oh_no();
  if (r.is_ok(res)) {
    t.fail('fail() Result was ok');
  }
  if (r.is_fail(res)) {
    t.is(res.message, error_message, 'Result error message is proper.');
  }
});

test(async function ok_works(t) {
  t.plan(1);
  let oh_yeah = function oh_yeah() : r.Res {
    return r.ok();
  }
  let res = oh_yeah();
  if (r.is_fail(res)) {
    t.fail('ok() Result was fail');
  }
  t.truthy(r.is_ok(res), 'ok result is_ok');
});

test(async function basic_success_works(t) {
  t.plan(1);
  let success_value = 'WOW';
  let oh_yeah = function oh_yeah() : r.Result<string, void> {
    return r.success(success_value);
  }
  let res = oh_yeah();
  if (r.is_fail(res)) {
    t.fail('success() Result was fail');
  }
  if (r.is_ok(res)) {
    t.is(res.result, success_value, 'Success value successfully passed');
  }
});
