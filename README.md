mistakes.computer
=================

A silly project to try out [Deno Deploy]. Picks a random thing that was a
mistake (most of which the application uses 😅). Provides a website,
JSON endpoint, and [Mattermost] slash command.

Local Development
-----------------

For local development you need [Deno]. Then install [deployctl]:

    deno install --allow-read --allow-write --allow-env --allow-net --allow-run --no-check --unstable -r -f https://deno.land/x/deploy/deployctl.ts

Run the local server:

    deployctl run --watch --libs=ns,fetchevent src/index.tsx

License
-------

MIT

[Deno]: https://deno.land/
[Deno Deploy]: https://deno.com/deploy
[deployctl]: https://github.com/denoland/deployctl
[Mattermost]: https://mattermost.com/
