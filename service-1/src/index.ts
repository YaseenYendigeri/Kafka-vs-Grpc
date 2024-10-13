import express from "express";
import route from "./setup/parentRoute";
import middleware from "./setup/middleware/basics";
import { syncDatabase } from "./models/index";

const app = express();

async function main() {
  try {
    const db = await syncDatabase();
    console.log("-------------", db);
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

main();

middleware(app);

route(app);

app.listen(1213, () => {
  return console.log(`Express is listening at http://localhost:1213`);
});
