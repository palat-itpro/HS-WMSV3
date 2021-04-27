import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ConfirmationService } from "primeng/api";
import { Observable } from "rxjs";
import { ImportService } from "../../services/import.service";

@Component({
    selector: "app-unloading",
    templateUrl: "./unloading.component.html",
    styleUrls: ["./unloading.component.scss"],
})
export class UnloadingComponent implements OnInit {
    constructor(
        private afs: AngularFirestore,
        public immpserv: ImportService,
        private confirmationService: ConfirmationService
    ) {}

    cols: any[] = [
        { field: "containerNumber", header: "Container No." },
        { field: "dftRemain", header: "DFT Remainineg (Days)" },
        { field: "dftDays", header: "DFT (Date)" },
        { field: "sku", header: "SKU" },
        { field: "shipment", header: "Shipment No." },
        { field: "actions", header: "Actions" },
    ];

    getDft(discharge: any, agent: string) {
        return this.immpserv.getDft(discharge, agent);
    }

    readytoUnloadData: Observable<any>;
    badgeVal: Observable<any>;

    ngOnInit(): void {
        this.afs
            .collection("exwh_lae", (ref) =>
                ref.where("status", "==", "unloading")
            )
            .valueChanges()
            .subscribe((res: any) => {
                this.readytoUnloadData = res;
                this.badgeVal = res.length;
            });
    }

    confirmUnload(docid: string) {
        // this.afs.collection("exwh_lae").doc(docid).update({
        //     status: "unloading",
        // });
        this.confirmationService.confirm({
            message: "Unload this container : " + docid,
            accept: () => {
                //Actual logic to perform a confirmation
            },
        });
    }
}
