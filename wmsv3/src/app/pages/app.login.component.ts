import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
    selector: "app-login",
    templateUrl: "./app.login.component.html",
})
export class AppLoginComponent implements OnInit {
    constructor(private Authserv: AuthService,private afs: AngularFirestore) {}
    login() {
        this.Authserv.loginServ();
    }

    logOut() {
        this.Authserv.logout();
    }

    ngOnInit(){}

}
