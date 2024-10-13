import * as express from "express";
import * as controller from "src/api/v1/controllers/controllers.seed";

const routes = express.Router();

// routes.get("/user", controller.getUser);
routes.post("/seed", controller.seedCoordinates);

export default routes;
