
export interface IStreamingSource {
    subscribe(opts: any, callback: (data) => void);
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