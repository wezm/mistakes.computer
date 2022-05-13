/** @jsx h */
import {
    h,
    jsx,
    json,
    serve,
    serveStatic,
    validateRequest,
    Routes,
} from "https://deno.land/x/sift@0.5.0/mod.ts";
import { mistakeText, pickMistake, MISTAKES } from "./mistakes.ts";
import { escapeRegExp } from "./utils.ts";

type MistakesProps = {
    mistake: string
}

const Mistakes = function (props: MistakesProps) {
    const mistake = mistakeText(props.mistake);
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="style.css" />
                <link rel="icon" href="favicon.png" type="image/png" />
                <title>mistakes.computer</title>
                <meta property="og:url" content={"https://mistakes.computer/" + props.mistake} />
                <meta property="og:title" content="mistakes.computer" />
                <meta property="og:description" content={mistake} />
                <meta property="og:type" content="article" />
                <meta property="og:locale" content="en_AU" />
                <meta property="og:image" content="https://mistakes.computer/favicon.png" />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@wezm" />
            </head>
            <body>
                <article>
                    <main><h1>{mistake}</h1>
                    </main>
                    <footer>
                        <p>
                            One of {MISTAKES.size} mistakes,{" "}
                            <a href={"/" + props.mistake}>share this mistake</a> or <a href="/">view another one</a>.<br />
                            A fun project by{" "}
                            <a href="https://www.wezm.net/">wezm</a> to try out{" "}
                            <a href="https://deno.com/deploy">Deno Deploy</a>{". "}
                            <a href="https://github.com/wezm/mistakes.computer">Source on GitHub</a>, contributions welcome.
                        </p>
                    </footer>
                </article>
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

    const formData = await request.formData();
    const formText = formData.get("text");
    let mistake: string;
    if (typeof formText === "string" && !formText.match(/^\s*$/)) {
        mistake = `${formText} a mistake`
    }
    else {
        mistake = mistakeText(pickMistake());
    }

    return json({
        "response_type": "in_channel",
        "text": mistake
    });
}

function verifyToken(request: Request): boolean {
    const TOKEN = Deno.env.get("MM_SLASH_TOKEN")!;
    const authorization = request.headers.get("Authorization")!;
    return authorization === ("Token " + TOKEN)
}

const routes: Routes = {
    "/": () => jsx(<Mistakes mistake={pickMistake()} />),
    "/slash": slashCommand,
    "/mistake.json": () => json({ mistake: mistakeText(pickMistake()) }),
    "/favicon.png": serveStatic("favicon.png", { baseUrl: import.meta.url }),
    "/style.css": serveStatic("style.css", { baseUrl: import.meta.url }),
    404: () => jsx(<Mistakes mistake="404" />, { status: 404 }),
};
for (const slug of MISTAKES.keys()) {
    routes[escapeRegExp('/' + slug)] = () => {
        console.log(slug);
        return jsx(<Mistakes mistake={slug} />)
    }
}
serve(routes)
