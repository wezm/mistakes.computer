import {
    h,
    jsx,
    json,
    serve,
    serveStatic,
    validateRequest,
    Routes,
} from "https://deno.land/x/sift@0.3.4/mod.ts";
import { mistakeText, pickMistake, MISTAKES } from "./mistakes.ts";
import { escapeRegExp } from "./utils.ts";

type MistakesProps = {
    mistake: string
}

const Mistakes = function (props: MistakesProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="stylesheet" href="style.css" />
                <link rel="icon" href="favicon.png" type="image/png" />
                <title>mistakes.computer</title>
            </head>
            <body>
                <article>
                    <main><h1>{mistakeText(props.mistake)}</h1>
                    </main>
                    <footer>
                        <p>
                            A silly project by{" "}
                            <a href="https://www.wezm.net/">wezm</a> to try out{" "}
                            <a href="https://deno.com/deploy">Deno Deploy</a>{". "}
                            <a href="https://github.com/wezm/mistakes.computer">Source on GitHub</a>{". "}
                            <a href={"/" + props.mistake}>Share this mistake</a>.
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
