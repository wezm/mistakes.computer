mistakes.computer
=================

A silly project to try out [Deno Deploy]. Picks a random thing that was a
mistake (most of which the application uses 😅). Provides a website,
JSON endpoint, and [Mattermost] slash command.

### Endpoints

* Website: <https://mistakes.computer/>
* JSON: <https://mistakes.computer/mistake.json>
* Slash command: `/mistake Wesley's bot was`<br>
  <img width="281" alt="slash command screenshot" src="slash-command.png">

Local Development
-----------------

For local development you need [Deno]. Then install [deployctl]:

    deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check --unstable -r -f https://deno.land/x/deploy/deployctl.ts

Run the local server:

    deno run -A --no-check=remote src/index.tsx

License
-------

MIT

[Deno]: https://deno.land/
[Deno Deploy]: https://deno.com/deploy
[deployctl]: https://github.com/denoland/deployctl
[Mattermost]: https://mattermost.com/
