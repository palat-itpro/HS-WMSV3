import { Router, ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import firebase from "firebase/app";
import { MessageService } from "primeng/api";

@Component({
    selector: "app-unloadreport",
    templateUrl: "./unloadreport.component.html",
    styleUrls: ["./unloadreport.component.scss"],
    providers: [MessageService],
})
export class UnloadreportComponent implements OnInit {
    constructor(
        private afs: AngularFirestore,
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private messageService: MessageService
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
    partialClicked: boolean;
    emptyCont = false;
    user = localStorage.getItem("userName");
    timestamp = firebase.firestore.FieldValue.serverTimestamp();

    ngOnInit(): void {
        this.docID = this.route.snapshot.paramMap.get("docid");
        this.partialClicked = false;

        this.unloadForm = this.fb.group({
            sku: this.fb.array([]),
            partialUnload: [false, Validators.required],
            actualUnload: [, Validators.required],
            remaining: this.fb.array([]),
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

    partialSelected() {
        this.messageService.add({
            severity: "success",
            summary: "Unload process",
            detail: "Partial unload has selected",
        });
        this.partialClicked = true;
        return true;
    }

    get skuForm() {
        return this.unloadForm.get("sku") as FormArray;
    }

    get remForm() {
        return this.unloadForm.get("remaining") as FormArray;
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

        console.log(this.unloadForm.value);
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
        this.remForm.push(items);
    }

    getActualUnload(i: number) {
        let docQty = this.unloadForm.value.sku[i].qty;
        let damaged = this.unloadForm.value.remaining[i].damaged;
        let short = this.unloadForm.value.remaining[i].short;
        let extra = this.unloadForm.value.remaining[i].extra;
        let partial = this.unloadForm.value.remaining[i].partial;

        if (this.unloadForm.value.partialUnload == false) {
            return docQty + extra - short - damaged;
        } else {
            return docQty - partial - damaged;
        }
    }

    //     docQty: number,
    // damaged: number,
    // short: number,
    // extra: number,
    // partial: number

    getRemaining(i: number) {
        let docQty = this.unloadForm.value.remaining[i].qty;
        let damaged = this.unloadForm.value.remaining[i].damaged;
        let short = this.unloadForm.value.remaining[i].short;
        let extra = this.unloadForm.value.remaining[i].extra;
        let partial = this.unloadForm.value.remaining[i].partial;

        if (this.unloadForm.value.partialUnload == false) {
            return docQty + extra - short - damaged;
        } else {
            return docQty - partial - damaged;
        }
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
            this.unloadForm.value.remaining.forEach((element) => {
                if (element.damaged != 0) {
                    this.handelDamage(element);
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

            remArr.forEach((element) => {
                if (element.qty == 0) {
                    this.emptyCont = true;
                } else {
                    this.emptyCont = false;
                }
            });

            if (this.emptyCont == true) {
                this.afs.collection("exwh_lae").doc(this.docID).update({
                    status: "empty",
                    unloadfinished: this.timestamp,
                });
            }

            this.unloadForm.patchValue({ remaining: remArr, sku: remArr });
            this.afs
                .collection("exwh_lae")
                .doc(this.docID)
                .update({ remaining: remArr });
        }
        this.messageService.add({
            severity: "success",
            summary: "Unload report success",
            detail: this.docID,
        });
        this.router.navigate(["/import/unload"]);
    }

    partialUnloadReport() {
        this.unloadForm.patchValue({
            partialUnload: this.unloadForm.value.partialUnload,
            cheifUnload: this.user,
            containerNumber: this.docID,
            shipmenNumber: this.containerData.shipmentNumber,
            sku: this.unloadForm.value.sku,
            remaining: this.unloadForm.value.remaining,
            date: this.timestamp,
        });
        this.afs
            .collection("lae_unloadReport")
            .doc()
            .set(this.unloadForm.value);
        this.afs
            .collection("exwh_lae")
            .doc(this.docID)
            .update({
                sku: this.unloadForm.value.sku,
                remaining: this.unloadForm.value.remaining,
            });
    }

    fulllUnloadReport() {
        this.unloadForm.patchValue({
            partialUnload: this.unloadForm.value.partialUnload,
            cheifUnload: this.user,
            containerNumber: this.docID,
            shipmentNumber: this.containerData.shipmentNumber,
            sku: this.unloadForm.value.sku,
            remaining: this.unloadForm.value.remaining,
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
    remaining: any[];
}
