(import spork/randgen)

(def- grammar
  '{:slug (some (choice (range "az" "09") (set "-+")))
    :ws (some " ")
    :mistake (thru (choice " was" " were"))
    :main (sequence (capture :slug) :ws (capture :mistake) -1)})

(defn parse [line]
  (peg/match grammar line))

(defn- add [mistakes pair]
  (put mistakes ;pair))

(defn load [path]
  (with [f (file/open path)]
    (var mistakes (table))
    (loop [line :iterate (file/read f :line)]
      (-?>> (string/trimr line) parse (add mistakes)))
    mistakes))

(defn mistake-text [mistakes slug]
  (let [mistake (get mistakes slug "Breaking URLs was")]
    (string mistake " a mistake")))

(defn pick [mistakes] (randgen/rand-value (keys mistakes)))

