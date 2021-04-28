import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-unloadreport",
    templateUrl: "./unloadreport.component.html",
    styleUrls: ["./unloadreport.component.scss"],
})
export class UnloadreportComponent implements OnInit {
    constructor(
        private afs: AngularFirestore,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    unloadForm: FormGroup;
    containerData: Observable<any>;
    docID = this.route.snapshot.paramMap.get("docid");

    ngOnInit(): void {
        this.afs.collection("exwh_lae").doc().valueChanges().subscribe();
        this.unloadForm = this.fb.group({});
    }
}
