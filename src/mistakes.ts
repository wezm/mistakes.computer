import { pick } from "./utils.ts";

enum Tense {
    Was = "was",
    Were = "were",
}

export type Mistake = [string, Tense];

export const MISTAKES: Mistake[] = [
    ["Computers", Tense.Were],
    ["Emoji", Tense.Were],
    ["The Internet", Tense.Was],
    ["Sydney", Tense.Was],
    ["gTLDs", Tense.Were],
    ["MySQL", Tense.Was],
    ["Modern Chat Apps", Tense.Were],
    ["JavaScript", Tense.Was],
    ["GitHub", Tense.Was],
    ["Building applications out of web browsers", Tense.Was],
    ["Excel", Tense.Was],
    ["Advertising", Tense.Was],
    ["YAML", Tense.Was],
    ["DNS", Tense.Was],
    ["USB-C", Tense.Was],
    ["Novelty web sites", Tense.Were],
    ["Kubernetes", Tense.Was],
    ["Garbage collection", Tense.Was],
    ["Dependency injection", Tense.Was],
    ["Hacker News", Tense.Was],
    ["IDEs", Tense.Were],
    ["Facebook", Tense.Was],
]

export function mistakeText(): string {
    const mistake = pick(MISTAKES);
    return `${mistake[0]} ${mistake[1]} a mistake`
}