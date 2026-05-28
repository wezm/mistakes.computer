(import spork/http)
(import spork/json)
#(import mistakes)

(defn handler1 [req]
  # (def method (get req :method))
  # (case method
  #   "GET"
  #     (let [path (get req :path)]
  #       (case path
  #         "/" {:status 200 :body "home"}
  #         # "/slash"
  #         "/mistake.json" {:status 200 :body (json/encode {:mistake "todos"})}
  #         "/favicon.png" {:status 200 :body "favicon"}
  #         "/style.css" {:status 200 :body "css"}
  #         {:status 404 :body "not found"}
  #       ))
  #   #"GET" {:status 200 :body "xxx"}
  #   "POST" {:status 400 :body (http/read-body req)}
  #   {:status 404}))
)

(defn home [req] {:status 200 :body "home"})

(defn serve-static [file req] {:status 200 :body "todo serve-static"})

(defn html-mistake [req] {:status 200 :body "todo html"})

(defn json-mistake [req] {:status 200 :body (json/encode {:mistake "todos"})})

(def handler
  (->
    {
      "/" html-mistake
      #"/slash" slash-command
      "/mistake.json" json-mistake
      "/favicon.png" (partial serve-static "favicon.png")
      "/style.css" (partial serve-static "style.css")
      :default {:status 404 :body "not found"}
    }
    http/router
    http/logger
  )
)

(defn main
  [& args]
  (print "starting server on http://127.0.0.1:9000")
  (http/server handler "127.0.0.1" "9000"))
