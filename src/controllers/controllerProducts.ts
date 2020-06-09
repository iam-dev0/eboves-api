import Products from "../models/Products";
import { Op } from "sequelize";
import { Request, Response } from "express";


export interface TableListParams {
    sorter?: string;
    status?: string;
    name?: string;
    brandId?: number;
    sku?: string;
    productType?: string;
    pageSize?: string;
    current?: string;
}



export const getProducts = async (req: Request, res: Response): Promise<Response> => {
    const params: TableListParams = req.query;

    let where = {};

    if (params.name) {
        where = {
            ...where, name: {
                [Op.like]: `${params.name}%`
            }
        };
    }
    console.log(params);
    const data = await Products.findAndCountAll({
        limit: parseInt(params.pageSize || "20"),
        offset: parseInt(params.current || "1") * parseInt(params.pageSize || "20") - parseInt(params.pageSize || "20"),
        where

    });

    return res.json({
        current: params.current,
        data: data.rows,
        pageSize: params.pageSize,
        success: true,
        total: data.count,
    });
};





export const updateProductStatus = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { active } = req.query;

    await Products.update({ active }, {
        where: {
            id
        }
    });

    return res.json({
        success: true,
    });
};
