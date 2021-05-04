import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms"
import { AngularFirestore } from "@angular/fire/firestore"

@Component({
    selector: 'app-pendingdelivery',
    templateUrl: './pendingdelivery.component.html',
    styleUrls: ['./pendingdelivery.component.scss']
})
export class PendingdeliveryComponent implements OnInit {

    constructor(private afs: AngularFirestore) { }

    pendingDeliv: any;

    ngOnInit(): void {
        this.afs.collection("lae_so", ref => ref.where("status", "==", "stock confirmed")).valueChanges().subscribe((res: any) => {
            this.pendingDeliv = res
        })
    }

}
