import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
    providedIn: "root",
})
export class AuthService {
    constructor(
        public auth: AngularFireAuth,
        public router: Router,
        private afs: AngularFirestore
    ) {}

    userDBref = this.afs.collection("lae_users");
    currentUser: Observable<any>;

    loginServ() {
        this.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then((res) => {
                this.auth.authState.subscribe((user: any) => {
                    if (user != null || undefined) {
                        localStorage.setItem("uid", user.uid);
                        localStorage.setItem("userData", user);
                        let userObj = {
                            uid: user.uid,
                            photoURL: user.photoURL,
                            email: user.email,
                            displayName: user.displayName,
                            online: true,
                        };
                        this.userDBref.doc(user.uid).set({ userObj });
                        localStorage.setItem("uid",userObj.uid)
                    }
                });

                this.router.navigate(["dashboard"]);
            })
            .catch((error) => {
                alert("Login error!" + `${error}`);
            });
    }

    logout() {
        this.auth.signOut();
        localStorage.removeItem("uid");
        this.router.navigate([""]);
    }

    user: any
    get isLoggedIn(): boolean {
        if(localStorage.getItem("userData")){
             this.user = JSON.parse(localStorage.getItem("userData"));
        }
        return this.user !== null && this.user.emailVerified !== false
            ? true
            : false;
    }

}
