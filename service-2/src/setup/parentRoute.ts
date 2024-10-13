import { Router, Request, Response, NextFunction } from "express";
import { authenticate } from "./middleware/authenticate";
import { errorHandler } from "./middleware/errorHandler";
import routes from "src/api/v1/routes/routes.seed";

export default function (app: Router): void {
  //app.use("*", authenticate);
  app.get("/", (request: Request, response: Response) => {
    response.send({ message: "Welcome to trip module" });
  });
  app.use("/user-api/v1", routes);
  app.use(errorHandler);
}
