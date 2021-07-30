export function random(min: number, max: number): number {
    return Math.floor(
        (Math.random() * (max - min + 1)) + min
    );
}

export function pick<T>(array: Array<T>): T {
    const i = random(0, array.length - 1);
    return array[i];
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
export function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
