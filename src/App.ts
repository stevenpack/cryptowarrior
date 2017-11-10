
import * as blessed from 'blessed';
import { GdaxApi } from './sources/GdaxApi';
import { PriceHistorySource, GdaxPriceHistoryAdapter } from './sources/PriceHistorySource';
let contrib = require('blessed-contrib');

export class App {
    public priceHistorySource: PriceHistorySource;
    
    constructor() {
        let rawSource = new GdaxApi();
        let adapter = new GdaxPriceHistoryAdapter();
        this.priceHistorySource = new PriceHistorySource(rawSource, adapter);

    }   
    
    async get() : Promise<any> {
        let prices = await this.priceHistorySource.getData();
        console.log(JSON.stringify(prices, null, 2));
    }
}


export class Test {
    constructor() {
        let screen = blessed.screen({            
        })
    
        
        //create layout and widgets
        
        let grid = new contrib.grid({rows: 12, cols: 12, screen: screen}) 
        
        let line = contrib.line(
            { style:
              { line: "yellow"
              , text: "green"
              , baseline: "black"}
            , xLabelPadding: 3
            , xPadding: 5
            , label: 'Title'})
        , data = {
            x: ['t1', 't2', 't3', 't4'],
            y: [5, 1, 7, 5]
         }
        screen.append(line) //must append before setting data 
        line.setData([data])
        
        screen.key(['escape', 'q', 'C-c'], function(ch, key) {
        return process.exit(0);
        });
        
        screen.render()

    }    
}

