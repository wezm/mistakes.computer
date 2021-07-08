import {
    h,
    jsx,
    json,
    serve,
    serveStatic,
    validateRequest,
} from "https://deno.land/x/sift@0.3.3/mod.ts";
import MISTAKES from "./mistakes.ts";

function random(min: number, max: number) : number {
    return Math.floor(
        (Math.random() * (max - min + 1)) + min
    );
}

function pick<T>(array: Array<T>) : T {
    const i = random(0, array.length - 1);
    return array[i];
}

function mistakeText() : string {
    const mistake = pick(MISTAKES);
    return `${mistake[0]} ${mistake[1]} a mistake`
}

const Mistakes = function() {
    return (
        <html>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="favicon.png" type="image/png"/>
            <link rel="stylesheet" href="style.css" />
            <title>mistakes.computer</title>
        </head>
        <body>
            <h1>{mistakeText()}</h1>
        </body>
        </html>
    );
}

async function slashCommand(request: Request) {
    const { error } = await validateRequest(request, {
        POST: {
            headers: ["Authorization", "Content-Type"],
        },
    });
    if (error) {
        return json({ error: error.message }, { status: error.status });
    }

    // Check the token
    const valid = verifyToken(request);
    if (!valid) {
        return json(
            { error: "Invalid request" },
            { status: 401 },
        );
    }

    return json({"text": mistakeText()});
}

function verifyToken(request: Request): boolean {
    const TOKEN = Deno.env.get("MM_SLASH_TOKEN")!;
    const authorization = request.headers.get("Authorization")!;
    return authorization === ("Token " + TOKEN)
}

serve({
    "/": () => jsx(<Mistakes/>),
    "/slash": slashCommand,
    "/mistake.json": () => json({mistake: mistakeText()}),
    "/favicon.png": serveStatic("favicon.png", { baseUrl: import.meta.url }),
    "/style.css": serveStatic("style.css", { baseUrl: import.meta.url }),
})
