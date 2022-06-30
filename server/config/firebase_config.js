import admin from "firebase-admin";

// eslint-disable-next-line
import serviceAccount from "./smarsheets_firebase.json" assert {type: 'json'} // eslint-disable-line
export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

