(import spork/http)

(defn handler
 [req]
 (def method (get req :method))
 (case method
  "GET" {:status 200 :body (get req :path)}
  "POST" {:status 400 :body (http/read-body req)}
  {:status 404}))

(defn main
  [& args]
  (http/server handler "127.0.0.1" "9000"))
