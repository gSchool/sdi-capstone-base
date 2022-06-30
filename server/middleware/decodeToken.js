import admin from "../config/firebase_config.js"
import {getAuth} from "firebase-admin/auth"

// class Middleware {
//   async decodeToken(req, res, next) {
//     const token = req.headers.authorization.split(" ")[1];
//     try {
//       const decodeValue = await admin.auth().verifyIdToken(token);
//       if (decodeValue) {
//         req.user = decodeValue;
//         return next();
//       }
//       return res.json({ message: "Un authorize" });
//     } catch (e) {
//       return res.json({ message: "Internal Error" });
//     }
//   }
// }

const decodedToken = (req, res, next) => {

  const idToken = req.headers.authorization.split(" ")[1];
  getAuth(admin)
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      if(decodedToken) {
        req.user = decodedToken
        return next()
      }
      res.send("Unauthorized")
    })
    .catch(() => {
      res.send('Internal Error')
    });
}


export default decodedToken