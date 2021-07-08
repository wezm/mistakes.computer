enum Tense {
    Was = "was",
    Were = "were",
}

export type Mistake = [string, Tense];

const MISTAKES: Mistake[] = [
    ["Computers", Tense.Were],
    ["Emoji", Tense.Were],
    ["The Internet", Tense.Was],
    ["Sydney", Tense.Was],
    ["gTLDs", Tense.Were],
    ["MySQL", Tense.Was],
]

export default MISTAKES;
