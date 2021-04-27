import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from "@angular/forms";
import * as firebase from "firebase";

@Component({
    selector: "app-addshipment",
    templateUrl: "./addshipment.component.html",
    styleUrls: ["./addshipment.component.scss"],
})
export class AddshipmentComponent implements OnInit {
    Firebase = firebase.default;
    timestamp = this.Firebase.firestore.FieldValue.serverTimestamp();
    user: any = localStorage.getItem("userName");

    constructor(private fb: FormBuilder, private afs: AngularFirestore) {
        this.agent = [
            { name: "select agent", inactive: true },
            { name: "ANL" },
            { name: "NEW PAC" },
            { name: "MARIANA" },
            { name: "DEUGRO" },
        ];
    }
    shipmentForm: FormGroup;
    ngOnInit(): void {
        this.shipmentForm = this.fb.group({
            addedBy: [this.user],
            containerList: this.fb.array([]),
            agent: [],
            dft: [],
            discharge: [],
            dischargeTime: [],
            loadingdate: [],
            shipmentNumber: [],
            status: ["active"],
            total: [],
            update: [this.timestamp],
        });
    }

    get containerForm() {
        return this.shipmentForm.get("containerList") as FormArray;
    }

    addContainer() {
        const cont = this.fb.group({
            containerNumber: [],
            sku: this.fb.array([]),
            iskeyCont: [],
        });
        this.containerForm.push(cont);
        // console.log(this.containerForm.controls)
    }

    removeContainer(i: number) {
        this.containerForm.removeAt(i);
    }

  //----------------------------------------------------------------------------------------------------------------------//

  skuGroup(): FormGroup {
      return this.fb.group({
        skuCode: [],
        qty: [],
      })
  }


  addSku(index): void {

    (<FormArray>(<FormGroup>this.containerForm.controls[index]).controls.contacts).push(this.skuGroup());
  }


    skuList = [
        { skuCode: "AO01" },
        { skuCode: "AO05" },
        { skuCode: "AO10" },
        { skuCode: "FOAMBOX_105P" },
        { skuCode: "FR01" },
        { skuCode: "FR05" },
        { skuCode: "FR10" },
        { skuCode: "JB01" },
        { skuCode: "JB10" },
        { skuCode: "JB20" },
        { skuCode: "JG01" },
        { skuCode: "JG05" },
        { skuCode: "JG10" },
        { skuCode: "JR01" },
        { skuCode: "JR05" },
        { skuCode: "JR10" },
        { skuCode: "SL1" },
        { skuCode: "SL250" },
        { skuCode: "SL500" },
        { skuCode: "SR01" },
        { skuCode: "SR05" },
        { skuCode: "SR10" },
        { skuCode: "SR20" },
        { skuCode: "SW01" },
    ];

    sku: sku[] = this.skuList;
    selectedSku: sku;

    agent: agent[];
    selectedAgent: string;

    dischargeTime: any;
    dischargeDate: any;

    getSohtoSku() {
        //     this.afs
        //         .collection("soh")
        //         .valueChanges()
        //         .subscribe((res: any) => {
        //             res.forEach((element) => {
        //                 this.sku.push(element.SKU_CODE);
        //             });
        //             console.log(this.sku);
        //         });
    }
}

interface sku {
    skuCode: string;
}

interface agent {
    name: string;
    inactive?: boolean;
}
