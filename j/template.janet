(use spork/htmlgen)

(defn head [mistake]
  (html
    @[[:head
       @[[:meta {:charset "utf-8"}]
         [:meta {:name "viewport" :content "width=device-width, initial-scale=1"}]
         ]
       ]
      ]))

(defn render [mistake]
  (html
    @[[:html
       (raw (head mistake))
     ]
    ]
  )
)

