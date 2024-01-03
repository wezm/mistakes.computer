import { pick } from "./utils.ts";

enum Tense {
    Was = "was",
    Were = "were",
}

export type Mistake = [string, Tense];

export const MISTAKES: Map<string, Mistake> = new Map([
    ["computers", ["Computers", Tense.Were]],
    ["emoji", ["😀 Emoji", Tense.Were]],
    ["internet", ["The Internet", Tense.Was]],
    ["sydney", ["Sydney", Tense.Was]],
    ["gtlds", ["gTLDs", Tense.Were]],
    ["mysql", ["MySQL", Tense.Was]],
    ["chat", ["Modern Chat Apps", Tense.Were]],
    ["js", ["JavaScript", Tense.Was]],
    ["github", ["GitHub", Tense.Was]],
    ["browsers-as-apps", ["Building applications out of web browsers", Tense.Was]],
    ["excel", ["Excel", Tense.Was]],
    ["ads", ["Advertising", Tense.Was]],
    ["amp", ["Accelerated Mobile Pages", Tense.Were]],
    ["yaml", ["YAML", Tense.Was]],
    ["dns", ["DNS", Tense.Was]],
    ["dst", ["Daylight Saving Time", Tense.Was]],
    ["usbc", ["USB-C", Tense.Was]],
    ["novelty-sites", ["Novelty web sites", Tense.Were]],
    ["kubernetes", ["Kubernetes", Tense.Was]],
    ["gc", ["Garbage collection", Tense.Was]],
    ["dependency-injection", ["Dependency injection", Tense.Was]],
    ["hacker-news", ["Hacker News", Tense.Was]],
    ["ide", ["IDEs", Tense.Were]],
    ["facebook", ["Facebook", Tense.Was]],
    ["c", ["C", Tense.Was]],
    ["c++", ["C++", Tense.Was]],
    ["css", ["Cascading Style Sheets", Tense.Were]],
    ["electron", ["Electron", Tense.Was]],
    ["null", ["NULL", Tense.Was]],
    ["smartphones", ["Smartphones", Tense.Were]],
    ["printers", ["Printers", Tense.Were]],
    ["software", ["Software", Tense.Was]],
    ["regex", ["Regular Expressions", Tense.Were]],
    ["twitter", ["Twitter", Tense.Was]],
    ["windows", ["Microsoft Windows", Tense.Was]],
    ["msdos", ["MS-DOS", Tense.Was]],
    ["cryptocurrency", ["Cryptocurrency", Tense.Was]],
    ["nft", ["NFTs", Tense.Were]],
    ["nested-modals", ["Nested modals", Tense.Were]],
    ["iot", ["The IoT", Tense.Was]],
    ["colons", ["using '::' instead of ':' in Haskell type signatures", Tense.Was]],
    ["xml", ["XML", Tense.Was]], 
]);
const KEYS = Array.from(MISTAKES.keys());

export function mistakeText(slug: string): string {
    let mistake: Mistake = MISTAKES.get(slug) || ["Breaking URLs", Tense.Was];
    return `${mistake[0]} ${mistake[1]} a mistake`;
}

export function pickMistake(): string {
    return pick(KEYS);
}
