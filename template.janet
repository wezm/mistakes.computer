(use spork/htmlgen)
(import ./mistakes)

(defn- meta [property content]
  [:meta {:property property :content content}])

(defn head [slug mistake]
  (def title "mistakes.computer")
  @[[:meta {:charset "utf-8"}]
    [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
    [:link {:rel "stylesheet" :href "style.css"}]
    [:link {:rel "icon" :href "favicon.png" :type "image/png"}]
    [:link {:rel "me" :href "https://mastodon.decentralised.social/@wezm"}]
    [:title title]
    (meta "og:url" (string "https://mistakes.computer/" slug))
    (meta "og:title" title)
    (meta "og:description" mistake)
    (meta "og:type" "article")
    (meta "og:locale" "en_AU")
    (meta "og:image" "https://mistakes.computer/favicon.png")])

(defn body [slug mistake count]
  @[[:article
     @[[:main
        @[[:h1 mistake]]]]
     @[[:footer
        @[[:p
           (string "One of " count " mistakes, ")
           [:a {:href (string "/" slug)} "share this mistake"] " or "
           [:a {:href "/"} "view another one"] "." [:br]
          "A fun project by "
           [:a {:href "https://www.wezm.net/"} "wezm"]
           " to try out " [:del "Deno Deploy"] " "
           [:a {:href "https://janet-lang.org/"} "Janet"]
           ". "
           # TODO move to Codeberg
           [:a {:href "https://github.com/wezm/mistakes.computer"} "Source on GitHub"]
           ", contributions welcome."]]]]]])


(defn render [slug mistakes]
  (def mistake (mistakes/mistake-text mistakes slug))
  (defn doctype [buf] (buffer/push buf "<!DOCTYPE html>"))
  (html
    @[doctype [:html
       @[[:head (head slug mistake)]
         [:body (body slug mistake (length mistakes))]]]]))

