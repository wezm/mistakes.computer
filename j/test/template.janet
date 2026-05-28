(use spork/test)
(import template)

(start-suite)

(pp (template/render "foo"))

(assert (= (template/render "foo") "asfd"))

(end-suite)


