import { pick } from "./utils.ts";

enum Tense {
    Was = "was",
    Were = "were",
}

export type Mistake = [string, Tense];

export const MISTAKES: Map<string, Mistake> = new Map([
    ["ads", ["Advertising", Tense.Was]],
    ["amp", ["Accelerated Mobile Pages", Tense.Were]],
    ["android", ["Android", Tense.Was]],
    ["browsers-as-apps", ["Building applications out of web browsers", Tense.Was]],
    ["c", ["C", Tense.Was]],
    ["c++", ["C++", Tense.Was]],
    ["chat", ["Modern Chat Apps", Tense.Were]],
    ["colons", ["using '::' instead of ':' in Haskell type signatures", Tense.Was]],
    ["computers", ["Computers", Tense.Were]],
    ["cryptocurrency", ["Cryptocurrency", Tense.Was]],
    ["css", ["Cascading Style Sheets", Tense.Were]],
    ["dependency-injection", ["Dependency injection", Tense.Was]],
    ["deno", ["Deno", Tense.Was]],
    ["dns", ["DNS", Tense.Was]],
    ["dst", ["Daylight Saving Time", Tense.Was]],
    ["electron", ["Electron", Tense.Was]],
    ["emoji", ["😀 Emoji", Tense.Were]],
    ["excel", ["Excel", Tense.Was]],
    ["facebook", ["Facebook", Tense.Was]],
    ["gc", ["Garbage collection", Tense.Was]],
    ["github", ["GitHub", Tense.Was]],
    ["gtlds", ["gTLDs", Tense.Were]],
    ["hacker-news", ["Hacker News", Tense.Was]],
    ["ide", ["IDEs", Tense.Were]],
    ["internet", ["The Internet", Tense.Was]],
    ["iot", ["The IoT", Tense.Was]],
    ["java", ["Java", Tense.Was]],
    ["js", ["JavaScript", Tense.Was]],
    ["kubernetes", ["Kubernetes", Tense.Was]],
    ["llms", ["Large Language Models", Tense.Were]],
    ["msdos", ["MS-DOS", Tense.Was]],
    ["mysql", ["MySQL", Tense.Was]],
    ["nested-modals", ["Nested modals", Tense.Were]],
    ["nft", ["NFTs", Tense.Were]],
    ["novelty-sites", ["Novelty web sites", Tense.Were]],
    ["null", ["NULL", Tense.Was]],
    ["printers", ["Printers", Tense.Were]],
    ["regex", ["Regular Expressions", Tense.Were]],
    ["smartphones", ["Smartphones", Tense.Were]],
    ["software", ["Software", Tense.Was]],
    ["sydney", ["Sydney", Tense.Was]],
    ["twitter", ["Twitter", Tense.Was]],
    ["usbc", ["USB-C", Tense.Was]],
    ["windows", ["Microsoft Windows", Tense.Was]],
    ["xml", ["XML", Tense.Was]],
    ["yaml", ["YAML", Tense.Was]],
]);
const KEYS = Array.from(MISTAKES.keys());

export function mistakeText(slug: string): string {
    let mistake: Mistake = MISTAKES.get(slug) || ["Breaking URLs", Tense.Was];
    return `${mistake[0]} ${mistake[1]} a mistake`;
}

export function pickMistake(): string {
    return pick(KEYS);
}
