import { AuthService } from "./../services/auth.service";
import { Component } from "@angular/core";

@Component({
    selector: "app-login",
    templateUrl: "./app.login.component.html",
})
export class AppLoginComponent {
    constructor(private Authserv: AuthService) {}
    login() {
        this.Authserv.loginServ();
    }

    logOut() {
        this.Authserv.logout();
    }
}
