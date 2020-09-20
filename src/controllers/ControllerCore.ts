import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ContactUs from "../models/ContactUs";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await ContactUs.create(req.body)
    .catch((err) =>
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        message: err.message,
      })
    )
    .then((data) => res.status(httpStatus.CREATED).json({ sucess: true, data }))
    .catch(next);
};
