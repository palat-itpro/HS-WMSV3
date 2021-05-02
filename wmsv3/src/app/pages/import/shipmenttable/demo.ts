import firebase from "firebase/app";
export const shipmentData = {
    update: firebase.firestore.FieldValue.serverTimestamp(),
    shipmentNumber: "G21004-03C-DEMO2",
    addedBy: "PAUL RATCHATA",
    agent: "ANL",
    dft: 60,
    loadingdate: 1616973605,
    discharge: firebase.firestore.FieldValue.serverTimestamp(),
    status: "active",
    naqiaRelease: false,
    releaseUpdateBy: "",
    total: [
        { skuCode: "SL250", qty: 1250 },
        { skuCode: "SL500", qty: 1250 },
        { skuCode: "SL1", qty: 100 },
        { skuCode: "FOAMBOX_105P", qty: 170 },
    ],
    containerList: [
        {
            containerNumber: "CMAU 0784592",
            iskeyCont: false,
            sku: [
                {
                    skuCode: "SL250",
                    qty: 1250,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
                {
                    skuCode: "FOAM BOX 105P",
                    qty: 30,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
            ],
        },
        {
            containerNumber: "CMAU 3155119",
            sku: [
                {
                    skuCode: "SL500",
                    qty: 1250,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
                {
                    skuCode: "FOAMBOX_105P",
                    qty: 28,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
            ],
        },
        {
            containerNumber: "FCIU 6183275",
            sku: [
                {
                    skuCode: "SL1",
                    qty: 25,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
                {
                    skuCode: "FOAMBOX_105P",
                    qty: 37,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
            ],
        },
        {
            containerNumber: "GLDU 9896877",
            sku: [
                {
                    skuCode: "SL1",
                    qty: 25,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
                {
                    skuCode: "FOAMBOX_105P",
                    qty: 35,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
            ],
        },
        {
            containerNumber: "TEMU 0998759",
            sku: [
                {
                    skuCode: "SL1",
                    qty: 25,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
                {
                    skuCode: "FOAMBOX_105P",
                    qty: 35,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
            ],
        },
        {
            containerNumber: "TLLU 2081749",
            sku: [
                {
                    skuCode: "SL1",
                    qty: 25,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
                {
                    skuCode: "FOAMBOX_105P",
                    qty: 35,
                    damaged: 0,
                    extra: 0,
                    short: 0,
                    partial: 0,
                },
            ],
        },
    ],
};
