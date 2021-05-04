import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import { ConfirmationService, PrimeNGConfig } from "primeng/api";
import * as firebase from "firebase/app"
@Component({
    selector: "app-stockcontrol",
    templateUrl: "./stockcontrol.component.html",
    styleUrls: ["./stockcontrol.component.scss"],
    providers: [ConfirmationService],
})
export class StockcontrolComponent implements OnInit {
    soData: any;
    user: any
    timeStamp = firebase.default.firestore.FieldValue.serverTimestamp()

    constructor(
        private afs: AngularFirestore,
        private conf: ConfirmationService,
        private primengConfig: PrimeNGConfig
    ) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;
        this.user = localStorage.getItem("userName")
        this.afs
            .collection<soModel>("lae_so", (ref) =>
                ref.where("status", "==", "pending")
            )
            .valueChanges()
            .subscribe((res: any) => {
                this.soData = res;
            });
    }

    getSoh(sku: string) {
        return localStorage.getItem(sku);
    }

    confirm(so, inv) {
        this.afs
            .collection("lae_so")
            .doc(so + "_" + inv)
            .update({ status: "stock confirmed", stockController: this.user, stockConfTime: this.timeStamp });
    }
}

interface soModel {
    complete: any;
    createdBy: string;
    customer: string;
    date: any;
    ddNumber: string;
    id: string;
    invNumber: string;
    sku: any;
    so_number: string;
    status: string;
    transportOption: string;
}
