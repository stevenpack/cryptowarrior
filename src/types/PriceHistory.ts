

export class PriceHistory {

    constructor(public Items : Array<Candle>){

    }

}

export class Candle {
    
    constructor(public Time: number, 
                public Low: number, 
                public High : number, 
                public Open: number, 
                public Close: number, 
                public Volume: number) {

    }
}