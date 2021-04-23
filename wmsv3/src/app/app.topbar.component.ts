import { AuthService } from "./services/auth.service";
import user from "firebase/app";
import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AppMainComponent } from "./app.main.component";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
    selector: "app-topbar",
    templateUrl: "./app.topbar.component.html",
})
export class AppTopBarComponent implements OnInit {
    constructor(public app: AppMainComponent, public auth: AuthService,private afs: AngularFirestore) {}
    // userModel = user;
    // userStr = localStorage.getItem("userData");
    // userData: Observable<user.User> = JSON.parse(this.userStr);

    userInfo: any;

    logout() {
        this.auth.logout();
    }

    ngOnInit(){
        this.userData()
    }

        userData() {
            if(localStorage.getItem("uid") != null || undefined){
                const uid = localStorage.getItem("uid")
                this.afs.collection("lae_users").doc(uid).valueChanges().subscribe((res:any) => {
                    this.userInfo = res;
                    // console.log(this.userInfo)
                })
            }
        }
}
