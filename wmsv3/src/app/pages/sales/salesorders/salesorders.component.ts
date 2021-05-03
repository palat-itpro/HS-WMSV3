import { AngularFirestore } from "@angular/fire/firestore";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms"
import * as firebase from "firebase/app"
import { customerList_LAE } from "../customer"
@Component({
    selector: "app-salesorders",
    templateUrl: "./salesorders.component.html",
    styleUrls: ["./salesorders.component.scss"],
})
export class SalesordersComponent implements OnInit {
    constructor(private afs: AngularFirestore, private fb: FormBuilder) { }

    soData: any;
    skuData: any;
    soForm: FormGroup;
    user: string;
    timeStamp = firebase.default.firestore.FieldValue.serverTimestamp()
    transportChoices = [{ name: "SELECT TRANSPORT OPTION", inactive: true }, { name: "HS_LOGISTICS" }, { name: "LAND TRANSPORT" }, { name: "SHIPPING" }, { name: "OWN PICKUP" }, { name: "BLACK WRAP" }]
    selectedTransport: any
    customerList = customerList_LAE;
    selectedCustomer: any;
    displayAddSO: boolean;
    skuChoices: any[];

    ngOnInit(): void {
        this.displayAddSO = false;
        this.user = localStorage.getItem("userName");
        this.skuData = JSON.parse(localStorage.getItem("skuData"))
        console.log(this.skuData)
        this.skuData.forEach(element => {
            // this.skuChoices.push({
            //     name: element.SKU_CODE,
            // })
        });

        this.soForm = this.fb.group({
            complete: [false],
            createdBy: [this.user],
            customer: [, [Validators.required]],
            date: [this.timeStamp,],
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
        return this.soForm.get("sku") as FormArray
    }

    addSku() {
        const skus = this.fb.group({
            skuCode: [, [Validators.required]],
            qty: [, [Validators.required]],
        });
        this.skuForm.push(skus);
    }

    removeSku(i: number) {
        this.skuForm.removeAt(i)
    }



    showDialog() {
        this.displayAddSO = true;
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
