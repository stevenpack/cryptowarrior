import { Component, WidgetOpts } from "./Component";
import { GdaxApi } from "../sources/GdaxApi";
import { GdaxPriceHistoryAdapter, PriceHistorySource } from "../sources/PriceHistorySource";
import { EventEmitter } from "events";

const contrib = require('blessed-contrib');


export class LivePriceComponent extends EventEmitter implements Component {   
    
    lcd: any;
    
    constructor() {
        super();
    }
      
    getWidgetOpts(opts?: any): WidgetOpts {
        return new WidgetOpts(contrib.lcd,  
            {
                label: "BTC-USD",
                //segmentWidth: 0.05,
                //segmentInterval: 0.11,
                strokeWidth: 1,
                elements: 4,
                display: "0000",
                //elementSpacing: 4,
                //elementPadding: 2
            })
    }

    setWidget(widget: any) {
        this.lcd = widget;
    }

    configure(widget: any, opts?: any) {        
        
    }

    async load(opts?: any) {

        //TODO: IoC container
        let rawSource = new GdaxApi();
        let adapter = new GdaxPriceHistoryAdapter();
        let priceHistorySource = new PriceHistorySource(rawSource, adapter);
        let priceHistoryData = await priceHistorySource.getData();

     
        this.lcd.setDisplay(priceHistoryData.Items[0].Close);
        this.lcd.setOptions({
          color: 'green',
          //elementPadding: 4
        });        

        let callback = data => {
            switch (data.type) {
                case "open":
                    this.lcd.setDisplay(data.price);
                    this.emit("updated");
                  break;
              }              
        }
        rawSource.subscribe(callback)
    }


    /**
     * FOR LIVE SUBSCRIBE:
     * 
     * /**
* User Defined Type Guard!
*/
// function canWalk(arg: Animal): arg is IWalkingAnimal {
//     return (arg as IWalkingAnimal).walk !== undefined;
//  }
 
 
//  private moveAnimal(animal: Animal) {
//      if (canWalk(animal)) {
//          animal.walk();  // compiler knows it can walk now
//      }
//  }
    // */

}