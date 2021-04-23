import { AngularFirestore } from "@angular/fire/firestore";
import { AfterViewInit, Component, OnInit, PACKAGE_ROOT_URL, ViewChild } from "@angular/core";
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

    dftData = {
        SWIRE : 35,
        ANL : 60,
        NEW_PAC : 60,
        MARIANA: 45,
        CARPENTERS: 45,
        MAERSK: 35,
        DEUGRO: 45
    }

    getDft(){

    }

    skuCode: any[] = [];
    skuQty: any[] = []
    packingList: any[] = [];

    ngAfterViewInit(): void {

    }
    ngOnInit() {
        this.afs
        .collection("soh")
        .valueChanges()
        .subscribe((res: any) => {
            res.forEach((element:any) => {
                if(!this.skuCode.includes(element.SKU_CODE)){
                    this.skuCode.push(element.SKU_CODE);
                }
            });
            console.log(this.skuCode);
        });
        //
        this.afs
            .collection<shipmentmodel>("lae_shipment")
            .valueChanges()
            .subscribe((res: any) => {
                this.dataSource = res;
            });
    }

        AO01 = []
        AO05 = []
        AO10 = []
        FOAMBOX_105P = []
        FR01 = []
        FR05 = []
        FR10 = []
        JB01 = []
        JB10 = []
        JB20 = []
        JG01 = []
        JG05 = []
        JG10 = []
        JR01 = []
        JR05 = []
        JR10 = []
        SL1 = []
        SL250 = []
        SL500 = []
        SR01 = []
        SR05 = []
        SR10 = []
        SR20 = []
        SW01 = []



}
