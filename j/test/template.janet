(use spork/test)
(import spork/htmlgen)
(import ../template)

(start-suite)

(def mistakes {"foo" "Foo was" "stuff" "Stuff was" "tests" "Tests were"})

(def expected-head @`<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/><link rel="stylesheet" href="style.css"/><link rel="icon" href="favicon.png" type="image/png"/><link rel="me" href="https://mastodon.decentralised.social/@wezm"/><title>mistakes.computer</title><meta content="https://mistakes.computer/foo" property="og:url"/><meta content="mistakes.computer" property="og:title"/><meta content="Foo was a mistake" property="og:description"/><meta content="article" property="og:type"/><meta content="en_AU" property="og:locale"/><meta content="https://mistakes.computer/favicon.png" property="og:image"/>`)

(def expected-body @`<article><main><h1>Foo was a mistake</h1></main><footer><p>One of 99 mistakes, <a href="/foo">share this mistake</a> or <a href="/">view another one</a>.<br/>A fun project by <a href="https://www.wezm.net/">wezm</a> to try out <del>Deno Deploy</del> <a href="https://janet-lang.org/">Janet</a>. <a href="https://github.com/wezm/mistakes.computer">Source on GitHub</a>, contributions welcome.</p></footer></article>`)
# (print expected-body)
# (print (htmlgen/html (template/body "foo" "Foo was a mistake" 99)))

(assert (deep= (htmlgen/html (template/head "foo" "Foo was a mistake")) expected-head))
(assert (deep= (htmlgen/html (template/body "foo" "Foo was a mistake" 99)) expected-body))
(assert (template/render "foo" mistakes))

(end-suite)

