import { customerList_LAE } from "./../customer";
import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import * as firebase from "firebase/app";
@Component({
    selector: "app-salesorders",
    templateUrl: "./salesorders.component.html",
    styleUrls: ["./salesorders.component.scss"],
})
export class SalesordersComponent implements OnInit {
    constructor(private afs: AngularFirestore, private fb: FormBuilder) {}

    soData: any;
    skuData: any;
    soForm: FormGroup;
    user: string;
    timeStamp = firebase.default.firestore.FieldValue.serverTimestamp();
    transportChoices = [
        { name: "SELECT TRANSPORT OPTION", inactive: true },
        { name: "HS_LOGISTICS" },
        { name: "LAND TRANSPORT" },
        { name: "SHIPPING" },
        { name: "OWN PICKUP" },
        { name: "BLACK WRAP" },
    ];
    unitChoices = [
        { name: "SELECT UNIT", inactive: true },
        { name: "BAGS", inactive: false },
        { name: "BALES", inactive: false },
        { name: "CARTONS", inactive: false },
        { name: "BUNDLES", inactive: false },
    ];
    selectedTransport: any;
    customerList = customerList_LAE;
    selectedCustomer: any;
    displayAddSO: boolean;
    skuChoices: any[] = [];

    cols = [
        "DATE",
        "CUSTOMER",
        "SO",
        "DD",
        "INV",
        "SKU",
        "QTY",
        "SOH",
        "STATUS",
    ];

    ngOnInit(): void {
        this.displayAddSO = false;
        this.user = localStorage.getItem("userName");
        this.skuData = JSON.parse(localStorage.getItem("skuData"));

        this.skuData.forEach((element) => {
            if (this.skuData.includes) {
                this.skuChoices.push({
                    name: element.SKU_CODE,
                });
            }
        });

        this.soForm = this.fb.group({
            complete: [false],
            createdBy: [this.user],
            customer: [, [Validators.required]],
            date: [this.timeStamp],
            ddNumber: [, [Validators.required]],
            id: [, [Validators.required]],
            invNumber: [, [Validators.required]],
            sku: this.fb.array([]),
            so_number: [, [Validators.required]],
            status: ["pending"],
            transportOption: [, [Validators.required]],
        });

        this.afs
            .collection<soModel>("lae_so")
            .valueChanges()
            .subscribe((res: any) => {
                this.soData = res;
            });
    }

    get skuForm() {
        return this.soForm.get("sku") as FormArray;
    }

    addSku() {
        const skus = this.fb.group({
            skuCode: [, [Validators.required]],
            qty: [, [Validators.required]],
            unit: [, [Validators.required]],
        });
        this.skuForm.push(skus);
    }

    removeSku(i: number) {
        this.skuForm.removeAt(i);
    }

    showDialog() {
        this.displayAddSO = true;
    }

    submithandler() {
        let pointer = this.soForm.value;
        this.soForm.value.sku.forEach((element) => {
            console.log(element);
        });
        this.afs
            .collection("lae_so")
            .doc(pointer.so_number + "_" + pointer.invNumber)
            .set(this.soForm.value);
        this.displayAddSO = false;
    }

    getSoh(sku: string) {
        return localStorage.getItem(sku);
    }
}

interface soModel {
    complete: any;
    createdBy: string;
    customer: string;
    date: any;
    ddNumber: string;
    id: string;
    invNumber: string;
    sku: any;
    so_number: string;
    status: string;
    transportOption: string;
}
