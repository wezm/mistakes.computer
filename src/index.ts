function random(min: number, max: number) : number {
    return Math.floor(
        (Math.random() * (max - min + 1)) + min
    );
}

function pick<T>(array: Array<T>) : T {
    const i = random(0, array.length - 1);
    return array[i];
}

enum Tense {
    Was = "was",
    Were = "were",
}

type Mistake = [string, Tense];

const MISTAKES: Mistake[] = [
    ["Computers", Tense.Were],
    ["Emoji", Tense.Were],
    ["The Internet", Tense.Was],
    ["Sydney", Tense.Was],
    ["gTLDs", Tense.Were],
    ["MySQL", Tense.Was],
]

addEventListener("fetch", (event) => {
    const mistake = pick(MISTAKES);

    const html = `<html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>mistakes.computer</title>
        <style>body { text-align: center; font-family: sans-serif; }</style>
      </head>
      <body>
        <h1>${mistake[0]} ${mistake[1]} a mistake</h1>
      </body></html>`;
    const response = new Response(html, {
        headers: { "content-type": "text/html; charset=utf-8" },
    });
    event.respondWith(response);
});
