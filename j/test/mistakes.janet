(use spork/test)
(import mistakes)

(start-suite)

(assert (= (mistakes/mistake-text "null") "NULL was a mistake"))
(assert (= (mistakes/mistake-text "missing") "Breaking URLs was a mistake"))

(assert (mistakes/pick) "can pick a mistake by slug")

(end-suite)

