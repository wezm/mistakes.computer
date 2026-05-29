(use spork/test)
(import ../mistakes)

(start-suite)

(def m (mistakes/load "mistakes.txt"))

(assert (= (mistakes/mistake-text m "null") "NULL was a mistake"))
(assert (= (mistakes/mistake-text m "missing") "Breaking URLs was a mistake"))

(assert-not (nil? (mistakes/pick m)) "can pick a mistake by slug")

(assert (deep= (mistakes/parse "emoji   😀 Emoji were") @["emoji" "😀 Emoji were"]))

(assert (= (mistakes/parse "test inner were what was") nil) "inner tense")
(assert (= (mistakes/parse "emoji   😀 Emoji were after") nil) "trailing text after tense")
(assert (= (mistakes/parse "em&oji   😀 Emoji were") nil) "invalid char in slug")
(assert (= (mistakes/parse "emoji   😀 Emojiwere") nil) "requires space at end")

(end-suite)

