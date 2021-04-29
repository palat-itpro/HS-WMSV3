import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";

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
        private route: ActivatedRoute,
    ) {
        this.unloadForm = this.fb.group({
            sku: this.fb.array([]),
            partialUnload: false,
            actualUnload: [],
            remaining: [],
            damageRecord: [],
        });
    }

    containerData: Observable<any>;
    unloadForm: FormGroup;
    docID: any;
    selectedrow: any[];

    @Input()
    group: string

    ngOnInit(): void {
        this.docID = this.route.snapshot.paramMap.get("docid");

        this.afs
            .collection("exwh_lae")
            .doc(this.docID)
            .valueChanges()
            .subscribe((res: any) => {
                this.containerData = res;
                console.log(res);
                res.sku.forEach(element => {
                    this.addSku();
                });
                this.unloadForm.patchValue({ sku: res.sku });
            });
    }

    get skuForm() {
        return this.unloadForm.get("sku") as FormArray;
    }

    addSku() {
        const items = this.fb.group({
            skuCode: [],
            qty: [],
        });
        this.skuForm.push(items);
    }
}
