import Countries from "../models/Countries";
import Cities from "../models/Cities";
import { Request, Response } from "express";
import httpStatus from "http-status";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await Countries.findAll({ include: [{ model: Cities }] });
  return res.status(httpStatus.OK).json({ data });
};
