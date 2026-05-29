(import spork/randgen)

(defn seed-rng [req]
  # The rng is a dynamic variable in the fibre environment. Each request is
  # run in a new fibre, so the rng is initialised the same way, always
  # yielding the same value from pick. Seed with remote port.
  (def [_ remote-port] (net/peername (get req :connection)))
  (randgen/set-seed remote-port))

(defn read-file [path]
  (let [f (file/open path :r)
        content  (file/read f :all)]
    (file/close f)
    content))
