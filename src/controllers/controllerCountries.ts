
import Countries from "../models/Countries";
import { Request, Response } from "express";
export const getApi = async (req: Request, res: Response): Promise<Response> => {
    return res.json(await Countries.findAll());
};


