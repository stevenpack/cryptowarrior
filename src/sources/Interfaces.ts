/**
 * Interfaces to decouple UI from the source
 */

export interface IStreamingSource<T> {
    subscribe(opts: any, callback: (t: T) => void): Promise<number>;
    unsubscribe(subscriptionId: number);
}

export interface IDataSource {
    getData(opts: any): Promise<any>;
}

export interface ISource<T> {
    getData(opts: any): Promise<T>;
}
export interface IAdapter<T> {
    convert(data: any): T;
}
