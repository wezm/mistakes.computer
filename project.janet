(declare-project
  :name "mistakes" # required
  :description "a library that does things" # some example metadata.
  :author "Wesley Moore <wes@wezm.net>"
  :description "Computers things that were mistakes"
  :license "MIT"
  :url "https://github.com/wezm/mistakes.computer"
  :repo "https://github.com/wezm/mistakes.computer.git"

  # Optional urls to git repositories that contain required artifacts.
  :dependencies ["https://github.com/janet-lang/spork.git"]
)

(declare-executable
  :name "mistakes"
  :entry "server.janet"
  :install true)
