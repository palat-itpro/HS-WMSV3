import { AngularFirestore } from "@angular/fire/firestore";
import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
// import { shipmentData as shipmentDatamModel } from './demo';

export interface shipmentmodel {
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

    ngAfterViewInit(): void {
        this.afs
            .collection<shipmentmodel>("lae_shipment")
            .valueChanges()
            .subscribe((res: any) => {
                this.dataSource = res;
                console.log(this.dataSource);
            });
    }
    ngOnInit() {}
}
