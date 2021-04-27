import { Injectable } from "@angular/core";
import * as moment from "moment";

@Injectable({
    providedIn: "root",
})
export class ImportService {
    constructor() {}

    dftData = {
        SWIRE: 35,
        ANL: 60,
        NEW_PAC: 60,
        MARIANA: 45,
        CARPENTERS: 45,
        MAERSK: 35,
        DEUGRO: 45,
    };

    getDft(discharge: any, agent: string) {
        // this.dftData[`${agent}`]
        let today = moment();
        let disc = discharge.toMillis();
        let agentDft = moment(disc)
            .add(this.dftData[`${agent}`], "days")
            .toString();
        let safeDft = moment(disc)
            .add(this.dftData[`${agent}`], "days")
            .subtract(5, "days")
            .toString();

        let dftdate = moment(agentDft);
        let todaysdate = moment();
        let actualDftLeft = dftdate.diff(todaysdate, "days");

        let safedftdate = moment(safeDft);
        let safeDftLeft = safedftdate.diff(todaysdate, "days");

        // console.log(actualDftDays, safeDftDays);
        let dftData = {
            actualDftDate: agentDft,
            safeDft,
            actualDftLeft,
            safeDftLeft,
        };
        return dftData;
    }
}
