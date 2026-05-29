(import spork/http)
(import spork/json)

(import ./mistakes)
(import ./template)
(import ./util)

(defn home [req] {:status 200 :body "home"})

(defn serve-static [file content-type req]
  (def [ok res] (protect (util/read-file file)))
  (if ok
    {:status 200 :body res :headers {"Content-Type" content-type}}
    {:status 404 :body "Not found" :headers {"Content-Type" "text/plain"}}))

(defn html-mistake [slug ms req]
  (util/seed-rng req)
  (def body (template/render (or slug (mistakes/pick ms)) ms))
  {:status 200 :body body :headers {"Content-Type" "text/html"}})

(defn json-mistake [ms req]
  (util/seed-rng req)
  {:status 200
   :body (json/encode {:mistake (mistakes/mistake-text ms (mistakes/pick ms))})
   :headers {"Content-Type" "application/json"}})

(defn handler [ms]
  (var routes @{
      "/" (partial html-mistake nil ms)
      #"/slash" slash-command
      "/mistake.json" (partial json-mistake ms)
      "/favicon.png" (partial serve-static "favicon.png" "image/png")
      "/style.css" (partial serve-static "style.css" "text/css")
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
