

export class PriceHistory {

    constructor(public Items : Array<Candle>){

    }

}

export class Candle {
    
    constructor(public Time: Number, 
                public Low: Number, 
                public High : Number, 
                public Open: Number, 
                public Close: Number, 
                public Volume: Number) {

    }
}