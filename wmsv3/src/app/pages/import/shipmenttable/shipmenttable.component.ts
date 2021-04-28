import { map } from "rxjs/operators";
import { AngularFirestore } from "@angular/fire/firestore";
import { shipmentData } from "./demo";
import { Component, OnInit } from "@angular/core";
// import { shipmentData as shipmentDatamModel } from './demo';
import * as moment from "moment";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService } from "primeng/api";
import * as firebase from "firebase";
import { PrimeNGConfig } from "primeng/api";
import { Message } from "primeng/api";

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
    providers: [ConfirmationService],
})
export class ShipmenttableComponent implements OnInit {
    dataSource: shipmentmodel;

    /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    displayedColumns = ["SHIPMENT", "CONT"];
    subTableColumns = ["SKU", "QTY", "TON"];

    timeStamp = firebase.default.firestore.FieldValue.serverTimestamp();

    constructor(
        private afs: AngularFirestore,
        private fb: FormBuilder,
        private cf: ConfirmationService,
        private primengConfig: PrimeNGConfig
    ) {}

    naqiInspection: FormGroup;
    msgs: Message[] = [];
    position: string;
    userName = localStorage.getItem("userName");

    public dftData = {
        SWIRE: 35,
        ANL: 60,
        NEW_PAC: 60,
        MARIANA: 45,
        CARPENTERS: 45,
        MAERSK: 35,
        DEUGRO: 45,
    };

    public getDft(discharge: any, agent: string) {
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
        this.primengConfig.ripple = true;

        this.naqiInspection = this.fb.group({
            naqiareleaseDate: [, Validators.required],
        });
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

    submitNaqia(docId: string, v: any, shipment, agent, discharge) {
        this.cf.confirm({
            message: "Are you sure that you want to proceed?",
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => {
                this.msgs = [
                    {
                        severity: "info",
                        summary: "Confirmed",
                        detail: "You have accepted",
                    },
                ];
                this.afs.collection("lae_shipment").doc(docId).update({
                    releaseUpdateBy: this.userName,
                    naqiaRelease: true,
                    naqiaReleaseDate: this.timeStamp,
                });
                v.forEach((v: any) => {
                    // console.log(v.containerNumber);
                    this.fireWrite(v.containerNumber.replace(" ", ""), {
                        shipmentNumber: shipment,
                        containerNumber: v.containerNumber.replace(" ", ""),
                        sku: v.sku,
                        discharge: discharge,
                        agent: agent,
                        status: "ready to unload",
                        unloadStart: this.timeStamp,
                        cheifUnload: this.userName,
                    });
                });
            },
            reject: () => {
                this.msgs = [
                    {
                        severity: "info",
                        summary: "Rejected",
                        detail: "You have rejected",
                    },
                ];
            },
        });
    }

    fireWrite(docid: string, data: any) {
        this.afs.collection("exwh_lae").doc(docid).set(data);
    }
}
