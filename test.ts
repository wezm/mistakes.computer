import { assert, assertEquals } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { MISTAKES } from "./src/mistakes.ts";
import { random, pick } from "./src/utils.ts";

Deno.test("random", () => {
  const val = random(1, 10);
  assert(val >= 1 && val <= 10);
});

Deno.test("pick", () => {
    const val = pick(MISTAKES);
    assert(MISTAKES.indexOf(val) >= 0);
});
