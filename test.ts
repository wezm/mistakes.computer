import { assert, assertEquals, assertMatch } from "https://deno.land/std@0.103.0/testing/asserts.ts";
import { mistakeText } from "./src/mistakes.ts";
import { random, pick } from "./src/utils.ts";

Deno.test("random", () => {
    const val = random(1, 10);
    assert(val >= 1 && val <= 10);
});

Deno.test("pick", () => {
    const array = [1, 2, 3];
    const val = pick(array);
    assert(array.indexOf(val) >= 0);
});

Deno.test("mistakeText", () => {
    assertEquals(mistakeText('emoji'), "😀 Emoji were a mistake");
    assertEquals(mistakeText('invalid'), "Breaking URLs was a mistake");
});
