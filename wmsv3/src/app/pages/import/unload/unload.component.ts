import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { ImportService } from "../services/import.service";
import { ConfirmationService } from "primeng/api";

@Component({
    selector: "app-unload",
    templateUrl: "./unload.component.html",
    styleUrls: ["./unload.component.scss"],
    providers: [ConfirmationService],
})
export class UnloadComponent implements OnInit {
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

    readytoUnloadData: Observable<any>;

    ngOnInit(): void {
        this.afs
            .collection("exwh_lae", (ref) =>
                ref.where("status", "==", "ready to unload")
            )
            .valueChanges()
            .subscribe((res: any) => {
                this.readytoUnloadData = res;
            });
    }

    getDft(discharge: any, agent: string) {
        return this.immpserv.getDft(discharge, agent);
    }

    setUnload(docid: string) {
        this.afs.collection("exwh_lae").doc(docid).update({
            status: "unloading",
        });
        this.confirmationService.confirm({
            message: "Unload this container : " + docid,
            accept: () => {
                //Actual logic to perform a confirmation
            },
        });
    }
}
