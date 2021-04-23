
var admin = require("firebase-admin");

var serviceAccount = require("./servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const data = {"test":"test"};
const collectionKey = "entities"; //name of the collection

const firestore = admin.firestore();
const settings = {timestampsInSnapshots: true};
firestore.settings(settings);
if (data && (typeof data === "object")) {
Object.keys(data).forEach(docKey => {
 firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
    console.log("Document " + docKey + " successfully written!");
}).catch((error) => {
   console.error("Error writing document: ", error);
});
});
}
