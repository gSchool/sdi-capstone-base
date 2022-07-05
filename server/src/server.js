import express, { json } from "express";
import cors from "cors";
import {
  entryRoutes,
  fieldRoutes,
  sheetRoutes,
  userRoutes,
} from "../routes/index.js";
import decodedToken from "../middleware/decodeToken.js"

const server = express();

var opts = {
  origin: "*",
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  credentials: true,
};


server.use(cors(opts));
server.use(json());
server.use(decodedToken)
server.use("/api/", entryRoutes);
server.use("/api/", fieldRoutes);
server.use("/api/", sheetRoutes);
server.use("/api/", userRoutes);

// server.get("/api/", (request, response) => {
//   response.set("Access-Control-Allow-Origin", "*");
//   response.status(200).send("Api root route running");
// });

// server.get("/api/authors", (request, response) => {
//   knex("app_authors")
//     .select("*")
//     .then((authorRecords) => {
//       let responseData = authorRecords.map((author) => ({
//         firstName: author.first_name,
//         lastName: author.last_name,
//       }));
//       response.status(200).send(responseData);
//     });
// });

export default server;
