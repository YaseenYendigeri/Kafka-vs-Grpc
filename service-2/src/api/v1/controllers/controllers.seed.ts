import { Request, Response, NextFunction } from "express";
// import USER from "src/models/models.user";

export const addUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    let { name, address, mobile } = request.body;
    return response.status(200).send({ success: true, data: {}, message: "" });
  } catch (err) {
    console.log("8 --------------------", err);
    next(err);
  }
};
