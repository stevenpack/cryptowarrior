export class Javascript {
    public static isIterable(obj: any): boolean {
        if (obj == null) {
            return false;
        }
        return typeof obj[Symbol.iterator] === 'function';
    }
}
