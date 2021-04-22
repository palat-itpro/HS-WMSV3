import { AuthService } from "./services/auth.service";
import user from "firebase/app";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent implements OnInit {
    constructor(public app: AppMainComponent, public auth: AuthService) {}
    // userModel = user;
    // userStr = localStorage.getItem("userData");
    // userData: Observable<user.User> = JSON.parse(this.userStr);

    userInfo: any;

    logout() {
        this.auth.logout();
    }

    ngOnInit() {
        this.userInfo = JSON.parse(localStorage.getItem("userData"));
        console.log(this.userInfo);
    }
}
