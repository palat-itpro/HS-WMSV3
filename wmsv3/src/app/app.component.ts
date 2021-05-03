import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SharedService } from "./pages/services/shared.service";
@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
    constructor(
        private auth: AngularFireAuth,
        public authserv: AuthService,
        public router: Router,
        private afs: AngularFirestore,
        public sharedServ: SharedService
    ) { }

    skudata: any[];

    ngOnInit() {
        this.afs
            .collection("soh")
            .valueChanges()
            .subscribe((res: any) => {
                localStorage.setItem("skuData", JSON.stringify(res))
                res.forEach((element: any) => {
                    localStorage.setItem(element.SKU_CODE, element.QTY);
                });
            });
    }
}
