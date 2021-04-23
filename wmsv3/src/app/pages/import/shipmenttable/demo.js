"use strict";
exports.__esModule = true;
exports.Demo = void 0;
var demo_1 = require("./demo");
var Demo = /** @class */ (function () {
    function Demo() {
        this.shipmentData = {
            update: 1618833548,
            shipmentNumber: "G21004-03C-DEMO2",
            addedBy: "PAUL RATCHATA",
            agent: "ANL",
            dft: 60,
            loadingdate: 1617268500,
            discharge: "1618833548",
            status: "active",
            total: [
                { skuCode: "SL250", qty: 1250 },
                { skuCode: "SL500", qty: 1250 },
                { skuCode: "SL1", qty: 100 },
                { skuCode: "FOAM_105P", qty: 170 },
            ],
            containerList: [
                {
                    containerNumber: "CMAU 0784592",
                    iskeyCont: false,
                    sku: [
                        { skuCode: "SL250", qty: 1250 },
                        { skuCode: "FOAM BOX 105P", qty: 30 },
                    ]
                },
                {
                    containerNumber: "CMAU 3155119",
                    sku: [
                        { skuCode: "SL500", qty: 1250 },
                        { skuCode: "FOAM_105P", qty: 28 },
                    ]
                },
                {
                    containerNumber: "FCIU 6183275",
                    sku: [
                        { skuCode: "SL1", qty: 25 },
                        { skuCode: "FOAM_105P", qty: 37 },
                    ]
                },
                {
                    containerNumber: "GLDU 9896877",
                    sku: [
                        { skuCode: "SL1", qty: 25 },
                        { skuCode: "FOAM_105P", qty: 35 },
                    ]
                },
                {
                    containerNumber: "TEMU 0998759",
                    sku: [
                        { skuCode: "SL1", qty: 25 },
                        { skuCode: "FOAM_105P", qty: 35 },
                    ]
                },
                {
                    containerNumber: "TLLU 2081749",
                    sku: [
                        { skuCode: "SL1", qty: 25 },
                        { skuCode: "FOAM_105P", qty: 35 },
                    ]
                },
            ]
        };
    }
    return Demo;
}());
exports.Demo = Demo;
console.log(demo_1.shipmentData);
