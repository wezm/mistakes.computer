(import spork/http)
(import spork/json)

(import ./mistakes)
(import ./util)

(defn- validate-token [authorization]
  (def token (os/getenv "MM_SLASH_TOKEN"))
  (= authorization (string "Token " token)))

(defn- random-mistake [req ms]
  (util/seed-rng req)
  {:status 200
   :body (json/encode {:response_type "in_channel"
                       :text (mistakes/mistake-text ms (mistakes/pick ms))})
   :headers {"Content-Type" "application/json"}})

(defn- mistake-from-text [text]
  {:status 200
   :body (json/encode {:response_type "in_channel"
                       :text (string text " a mistake")})
   :headers {"Content-Type" "application/json"}})

(defn- process-form [req text ms]
  (if (or (nil? text) (empty? text))
    (random-mistake req ms)
    (mistake-from-text text)))

(defn- process-body [req ms]
  (def body (http/read-body req))
  (def form (util/read-form-data body))
  (if form
    (process-form req (-?> (get form "text") string/trim) ms)
    {:status 400
     :body (json/encode {:error "Invalid request" :status 400})
     :headers {"Content-Type" "application/json"}}))

(defn- process-post [req authorization ms]
  (if (validate-token authorization)
    (process-body req ms)
    {:status 401
     :body (json/encode {:error "Unauthorized" :status 401})
     :headers {"Content-Type" "application/json"}}))

(defn command [ms req]
  (def {:method method
        :headers {"authorization" authorization "content-type" content-type}} req)
  (if (and (= method "POST") authorization content-type)
    (process-post req authorization ms)
    {:status 400
     :body (json/encode {:error "Invalid request" :status 400})
     :headers {"Content-Type" "application/json"}}))
