import { Router, ActivatedRoute, ɵEmptyOutletComponent } from "@angular/router";
import { Observable } from "rxjs";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import { MessageService, SelectItem } from "primeng/api";
import { FormlyFieldConfig, FormlyFormOptions } from "@ngx-formly/core";
import * as firebase from "firebase";
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

    containerData: contData;
    soh: any;
    unloadForm: FormGroup;
    docID: any;
    selectedrow: any[];
    date = new Date();
    damaged: Number = 0;
    short: Number = 0;
    extra: Number = 0;
    reportGen = false;
    docValue: any;
    user = localStorage.getItem("userName");
    timestamp = firebase.default.firestore.FieldValue.serverTimestamp();

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
        this.docValue = this.unloadForm.value;
        this.afs
            .collection("exwh_lae", (ref) =>
                ref.where("status", "==", "partial" && "unloading")
            )
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
        let res = this.containerData;
        console.log(res);
        res.sku.forEach(() => {
            this.addSku();
        });
        this.unloadForm.patchValue({
            sku: res.sku,
            remaining: res.remaining,
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
            partial: [0, Validators.required],
        });
        this.skuForm.push(items);
    }

    getActualUnload(
        docQty: number,
        damaged: number,
        short: number,
        extra: number,
        partial: number
    ) {
        if (this.unloadForm.value.partialUnload == false) {
            return docQty + extra - damaged - short;
        } else {
            return partial + extra - damaged - short;
        }
    }

    getRemaining(
        docQty: number,
        damaged: number,
        short: number,
        extra: number,
        partial: number
    ) {
        return docQty - partial;
    }

    partialUnload() {
        if (this.unloadForm.value.partialUnload == true) {
            return true;
        } else {
            return false;
        }
    }

    submitHandler() {
        console.log(this.unloadForm.value);
        //FULL UNLOAD
        if (this.unloadForm.value.partialUnload == false) {
            this.unloadForm.value.sku.forEach((element) => {
                console.log(element);
                if (element.damaged != 0) {
                    this.handelDamage(element);
                }

                if (element.short != 0 && element.extra != 0) {
                    if (element.short != 0) {
                        this.handelShort(element);
                    }
                    if (element.extra != 0) {
                        this.handelExtra(element);
                    }
                }

                this.updateSOH(
                    element.skuCode,
                    element.qty - element.damaged - element.short
                );
                this.fulllUnloadReport();
            });
        }

        //PARTIAL
        if (this.unloadForm.value.partialUnload == true) {
            let remArr = [];
            this.unloadForm.value.sku.forEach((element) => {
                if (element.damaged != 0) {
                    this.handelDamage(element);
                }

                if (element.short != 0 && element.extra != 0) {
                    if (element.short != 0) {
                        this.handelShort(element);
                    }
                    if (element.extra != 0) {
                        this.handelExtra(element);
                    }
                }

                remArr.push({
                    skuCode: element.skuCode,
                    qty: element.qty - element.partial - element.damaged,
                    partial: 0,
                    damaged: 0,
                    extra: 0,
                });

                this.updateSOH(element.skuCode, element.partial);
                this.partialUnloadReport();
            });
            this.unloadForm.patchValue({ remaining: remArr, sku: remArr });
            this.afs
                .collection("exwh_lae")
                .doc(this.docID)
                .update({ remaining: remArr });
        }
    }

    partialUnloadReport() {
        this.unloadForm.patchValue({
            partialUnload: this.unloadForm.value.partialUnload,
            cheifUnload: this.user,
            containerNumber: this.docID,
            shipmenNumber: this.containerData.shipmentNumber,
            sku: this.unloadForm.value.sku,
            date: this.timestamp,
        });
        this.afs
            .collection("lae_unloadReport")
            .doc()
            .set(this.unloadForm.value);
        this.afs
            .collection("exwh_lae")
            .doc(this.docID)
            .update({ status: "partial", sku: this.unloadForm.value.sku });
    }

    fulllUnloadReport() {
        this.unloadForm.patchValue({
            partialUnload: this.unloadForm.value.partialUnload,
            cheifUnload: this.user,
            containerNumber: this.docID,
            shipmenNumber: this.containerData.shipmentNumber,
            sku: this.unloadForm.value.sku,
            date: this.timestamp,
        });
        this.afs
            .collection("lae_unloadReport")
            .doc()
            .set(this.unloadForm.value);
        this.afs.collection("exwh_lae").doc(this.docID).update({
            status: "empty",
            returned: false,
            unloadfinished: this.timestamp,
        });
    }

    updateSOH(sku: any, qty: number) {
        let currentStock = Number(localStorage.getItem(sku));
        this.afs
            .collection("soh")
            .doc(sku)
            .update({ QTY: currentStock + qty });
    }

    handelShort(element) {
        this.afs.collection("lae_importShortExtra").doc().set({
            shipmentNumber: this.containerData.shipmentNumber,
            sku: element.skuCode,
            qty: element.short,
            date: this.timestamp,
            cheifUnload: this.user,
            short: true,
        });
    }

    handelExtra(element) {
        this.afs.collection("lae_importShortExtra").doc().set({
            shipmentNumber: this.containerData.shipmentNumber,
            sku: element.skuCode,
            qty: element.extra,
            date: this.timestamp,
            cheifUnload: this.user,
            extra: true,
        });
    }

    handelDamage(element) {
        this.afs.collection("lae_importDamage").doc().set({
            containerNumber: this.docID,
            shipmentNumber: this.containerData.shipmentNumber,
            sku: element.skuCode,
            qty: element.damaged,
            date: this.timestamp,
            cheifUnload: this.user,
        });
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
    remaining: [];
}
