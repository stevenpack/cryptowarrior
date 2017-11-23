/**
 * Interfaces to decouple UI from the source
 */
export interface IStreamingSource<T> {
    subscribe(opts: any, callback: (t: T) => void): Promise<number>;
    unsubscribe(subscriptionId: number);
}

/**
 * Generalized way to retrieve any type of data.
 */
export interface ISource<T> {
    getData(opts: any): Promise<T>;
}

/**
 * Convert some raw data to type `T`
 */
export interface IAdapter<T> {
    convert(data: any): T;
}
