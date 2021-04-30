import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";

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
    ) { }

    containerData: contData;
    unloadForm: FormGroup;
    docID: any;
    selectedrow: any[];
    date = new Date();
    damaged: Number = 0;
    short: Number = 0;
    extra: Number = 0;
    reportGen = false;

    ngOnInit(): void {
        this.docID = this.route.snapshot.paramMap.get("docid");

        this.unloadForm = this.fb.group({
            sku: this.fb.array([]),
            partialUnload: [false, Validators.required],
            actualUnload: [, Validators.required],
            remaining: [, Validators.required],
            damageRecord: [, Validators.required],
            unloadStart: [, Validators.required],
            cheifUnload: [, Validators.required],
        });

        this.afs
            .collection("exwh_lae")
            .doc(this.docID)
            .valueChanges()
            .subscribe((res: any) => {
                this.containerData = res;
                // console.log(res.sku);
            });
    }

    get skuForm() {
        return this.unloadForm.get("sku") as FormArray;
    }

    initReport() {
        this.reportGen = true;
        let res = this.containerData
        console.log(res);
        res.sku.forEach(() => {
            this.addSku();
        });
        this.unloadForm.patchValue({
            sku: res.sku,
            unloadStart: res.unloadStart,
            cheifUnload: res.cheifUnload,
        });
    }

    addSku() {
        const items = this.fb.group({
            skuCode: [, Validators.required],
            qty: [, Validators.required],
            damaged: [0, Validators.required],
            short: [0, Validators.required],
            extra: [0, Validators.required],
        });
        this.skuForm.push(items);
    }
}

interface contData {
    agent: string;
    cheifUnload: string;
    containerNumber: string;
    discharge: any;
    shipmentNumber: string;
    sku: any[];
    status: string;
    unloadStart: any;
}
