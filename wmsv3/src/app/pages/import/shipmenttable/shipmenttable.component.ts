import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { shipmentData } from "./demo";
import { Component, OnInit } from "@angular/core";
// import { shipmentData as shipmentDatamModel } from './demo';
import * as moment from "moment";

export interface shipmentmodel {
    [x: string]: any;
    date: any;
    addedBy: any;
    agent: any;
    containerList: [
        {
            containerNumber: string;
            iskeyCont: boolean;
            sku: [
                {
                    skuCode: string;
                    qty: number;
                }
            ];
        }
    ];
    dft: any;
    discharge: any;
    loadingdate: any;
    shipmentNumber: any;
    status: string;
    update: any;
}

@Component({
    selector: "app-shipmenttable",
    templateUrl: "./shipmenttable.component.html",
    styleUrls: ["./shipmenttable.component.css"],
})
export class ShipmenttableComponent implements OnInit {
    dataSource: shipmentmodel;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ["SHIPMENT", "CONT"];
    subTableColumns = ["SKU", "QTY", "TON"];

    constructor(private afs: AngularFirestore) {}

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

    skuCode: any[] = [];
    skuQty: any[] = [];
    packingList: any[] = [];

    ngAfterViewInit(): void {}
    ngOnInit() {
        // this.afs
        //     .collection("lae_shipment")
        //     .doc(shipmentData.shipmentNumber)
        //     .set(shipmentData);

        this.afs
            .collection("soh")
            .valueChanges()
            .subscribe((res: any) => {
                res.forEach((element: any) => {
                    if (!this.skuCode.includes(element.SKU_CODE)) {
                        this.skuCode.push(element.SKU_CODE);
                    }
                });
            });
        //
        this.afs
            .collection<shipmentmodel>("lae_shipment")
            .valueChanges()
            .subscribe((res: any) => {
                this.dataSource = res;
            });
    }

    //     sum = prod.reduce(function(acc, curr) {
    //   let findIndex = acc.findIndex(item => item.name === curr.name);

    //   if (findIndex === -1) {
    //     acc.push(curr)
    //   } else {

    //     acc[findIndex].quantity += curr.quantity
    //   }
    //   return acc;
    // }, [])

    // console.log(sum)
}
