import Suppliers from "../models/Supplier";
import { Request, Response } from "express";





export const getSuppliers= async (req: Request, res: Response): Promise<Response> => {
    const data = await Suppliers.findAll({attributes:["id",["companyName","name"]]});

    return res.json(data);
};
