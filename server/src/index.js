import server from "./server.js";
import { buildTables, seedDb } from "../db/dbRefresh.js";
import chalk from "chalk";
// import { initializeApp } from 'firebase-admin/app';


const PORT = process.env.PORT || 8080;

await Promise.all(
  process.argv.map(async (arg) => {
    if (arg.toLowerCase() === "build") {
      await buildTables();
    }
    if (arg.toLowerCase() === "seed") {
      await seedDb();
    }
  })
);

server.listen(PORT, () => {
  console.log(
    chalk.green(
      `Server running in ${process.env.NODE_ENV} mode and listening on ${PORT}`
    )
  );
});
