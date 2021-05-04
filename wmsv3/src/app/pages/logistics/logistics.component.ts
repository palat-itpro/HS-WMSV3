import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms"
import { AngularFirestore } from "@angular/fire/firestore"
@Component({
    selector: 'app-logistics',
    templateUrl: './logistics.component.html',
    styleUrls: ['./logistics.component.scss']
})
export class LogisticsComponent implements OnInit {

    constructor(private afs: AngularFirestore) { }

    ngOnInit(): void {
    }

}
