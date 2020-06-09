import Attributes from "../models/Attributes";
import { Request, Response } from "express";





export const getAttributes= async (req: Request, res: Response): Promise<Response> => {
    const data = await Attributes.findAll({attributes:["id","name","type"]});

    return res.json(data);
};
