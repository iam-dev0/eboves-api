import Brands from "../models/Brands";
import { Request, Response } from "express";





export const getBrands= async (req: Request, res: Response): Promise<Response> => {
    const data = await Brands.findAll({attributes:["id","name","active","createdAt"]});
    return res.json(data);
};
