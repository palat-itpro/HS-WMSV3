import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from "./services/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
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
        private afs: AngularFirestore
    ) {}

    ngOnInit() {}
}
