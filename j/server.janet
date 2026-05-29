(import spork/http)
(import spork/json)
(import spork/randgen)

(import ./mistakes)
(import ./template)

(defn home [req] {:status 200 :body "home"})

(defn serve-static [file req] {:status 200 :body "todo serve-static"})

(defn html-mistake [slug ms req]
  # The rng is a dynamic variable in the fibre environment. Each request is
  # run in a new fibre, so the rng is initialised the same way, always
  # yielding the same value from pick. Seed with remote port.
  (def [_ remote-port] (net/peername (get req :connection)))
  (randgen/set-seed remote-port)
  (def body (template/render (or slug (mistakes/pick ms)) ms))
  {:status 200 :body body})

(defn json-mistake [req] {:status 200 :body (json/encode {:mistake "todos"})})

(defn handler [ms]
  (var routes @{
      "/" (partial html-mistake nil ms)
      #"/slash" slash-command
      "/mistake.json" json-mistake
      "/favicon.png" (partial serve-static "favicon.png")
      "/style.css" (partial serve-static "style.css")
      :default {:status 404 :body "not found"}})
  (eachk slug ms (put routes (string "/" slug) (partial html-mistake slug ms)))
  (->
    routes
    http/router
    http/logger
  )
)

(defn main
  [& args]
  (def mistakes.txt (get args 1 "mistakes.txt"))

  (print (string "loading " mistakes.txt))
  (if (nil? (os/stat mistakes.txt))
    ((eprint (string "'" mistakes.txt "' does not exist or is not readable")) (os/exit 1)))

  (def ms (mistakes/load mistakes.txt))

  (def port (os/getenv "MISTAKES_PORT" "9000"))
  (print "starting server on http://127.0.0.1:" port)
  (http/server (handler ms) "127.0.0.1" port))
