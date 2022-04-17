export function getRandomId(): string {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}

export function reverseString(str: string) {
    return str.split('').reverse().join('');
}

export function trimPrefix(str: string): string {
    str = reverseString(str);
    let del: number = str.indexOf('_');
    if (del != -1)
        str = str.substring(del + 1);
    return reverseString(str);
}