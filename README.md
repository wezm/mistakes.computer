> [!IMPORTANT]  
> Moved to Codeberg 👉 <https://codeberg.org/wezm/mistakes.computer>.

----

mistakes.computer
=================

A silly project to try out ~~Deno Deploy~~ [Janet]. It picks a random thing
that was a mistake (some of which the application uses 😅). Provides a website,
JSON endpoint, and [Mattermost] slash command.

### Endpoints

* Website: <https://mistakes.computer/>
* JSON: <https://mistakes.computer/mistake.json>
* Slash command: `/mistake Wesley's bot was`<br>
  <img width="281" alt="slash command screenshot" src="slash-command.png">

Local Development
-----------------

For local development you need [Janet] and [jpm]. On Casuarina Linux
install the `jpm` package to get both.

Initial setup, pull deps:

    jpm deps

Run the local server:

    janet server.janet

Run the tests:

    jpm test

Adding a Mistake
----------------

The mistakes are stored in simple text format in [mistakes.txt]. The format is:
`<URL slug> <whitespace> <mistake>`.

License
-------

MIT

[Janet]: https://janet-lang.org/
[jpm]: https://github.com/janet-lang/jpm
[Mattermost]: https://mattermost.com/
[mistakes.txt]: https://github.com/wezm/mistakes.computer/blob/main/mistakes.txt
