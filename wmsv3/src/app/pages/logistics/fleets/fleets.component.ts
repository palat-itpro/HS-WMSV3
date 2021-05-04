import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from "@angular/forms"
import { AngularFirestore } from "@angular/fire/firestore"
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-fleets',
    templateUrl: './fleets.component.html',
    styleUrls: ['./fleets.component.scss']
})
export class FleetsComponent implements OnInit {

    items: MenuItem[];

    constructor(private afs: AngularFirestore) { }

    ngOnInit() {
        this.items = [
            {
                label: 'Vehicle',
                items: [{
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                    items: [
                        { label: 'add new vehicle' },
                        { label: 'edit vehicle details' },
                        { label: 'Maintence request' },
                    ]
                },
                ]
            },
            {
                label: 'Report',
                icon: 'pi pi-fw pi-pencil',
                items: [
                    { label: 'Milage report', icon: 'pi pi-fw pi-file-o' },
                    { label: 'Breakdown report', icon: 'pi pi-fw pi-check-square' }
                ]
            }
        ];
    }

}
