
import {LayoutDetails} from "./LayoutBase";
import {ISource} from "../sources/Interfaces";

/**
 * Name and descriptions of screens. Used to break dependency of ScreenListComponent on LayoutBase
 *
 * Hack: Must match the screens managed by ScreenManager
 */
export class ScreenInventory implements ISource<LayoutDetails[]> {

    private layoutDetails: LayoutDetails[];

    constructor() {
        this.layoutDetails = [];

        this.layoutDetails.push(new LayoutDetails(
            0,
            "Single currency",
            "Live price, history and charts for a single currency",
        ));

        this.layoutDetails.push(new LayoutDetails(
            1,
            "Multi currency dashboard",
            "Multiple live streaming prices",
        ));

    }

    public getLayoutDetails(): LayoutDetails[] {
        return this.layoutDetails;
    }

    public getData(opts: any): Promise<LayoutDetails[]> {
        return Promise.resolve(this.getLayoutDetails());
    }


}
