import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-salesorders",
    templateUrl: "./salesorders.component.html",
    styleUrls: ["./salesorders.component.scss"],
})
export class SalesordersComponent implements OnInit {
    constructor(private afs: AngularFirestore) {}

    soData: any;

    ngOnInit(): void {
        this.afs
            .collection<soModel>("lae_so", (ref) =>
                ref.where("status", "==", "pending")
            )
            .valueChanges()
            .subscribe((res: any) => {
                this.soData = res;
                console.log(res);
            });
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
