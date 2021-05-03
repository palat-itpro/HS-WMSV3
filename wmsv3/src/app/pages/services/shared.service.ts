import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore"
@Injectable({
    providedIn: 'root'
})
export class SharedService {

    constructor(private afs: AngularFirestore) { }

    getSku() {
        return this.afs.collection("soh").valueChanges()
    }
}
