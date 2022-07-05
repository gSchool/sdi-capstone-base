import chalk from "chalk";
import db from "./db.js";

const runMigrations = async (retries, delay) => {
  for (let i = 1; i !== retries; i++) {
    try {
      await db.migrate.rollback();
      return await db.migrate.latest();
    } catch (err) {
      console.log(chalk.red(`Oh no, failed attempt! ${i} out of ${retries}`));
      await setTimeoutAsync(delay * i);
    }
  }
  throw new Error(`Unable to run migrations after ${retries} attempts.`);
};

const runSeed = async (retries, delay) => {
  for (let i = 1; i !== retries; i++) {
    try {
      return await db.seed.run();
    } catch (err) {
      console.log(chalk.red(`Oh no, failed attempt! ${i} out of ${retries}`));
      await setTimeoutAsync(delay * i);
    }
  }
  throw new Error(`Unable to run migrations after ${retries} attempts.`);
};

const setTimeoutAsync = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const buildTables = async () =>
  await runMigrations(10, 500)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    })
    .then((res) => {
      console.log(
        chalk.blue(`Batch ${res[0]} run: ${res[1].length} migrations`)
      );
      console.log(chalk.gray(res[1].join("\n")));
      return;
    });

export const seedDb = async () =>
  await runSeed(10, 500)
    .catch((err) => {
      console.log(err);
      process.exit(1);
    })
    .then((res) => {
      console.log(chalk.blue(`Ran ${res[0].length} seed file`));
      return;
    });
