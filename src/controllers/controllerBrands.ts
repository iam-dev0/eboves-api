import Brands from "../models/Brands";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { Op } from "sequelize";

export interface SearchParams {
  sorter?: string;
  active?: string;
  name?: string;
  createdAt?: string;
  pageSize?: string;
  current?: string;
}

export const getBrands = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: SearchParams = req.query;

  let where = {};
  const order: any = [];

  if (params.name)
    where = {
      ...where,
      name: {
        [Op.like]: `${params.name}%`,
      },
    };
  if (params.active)
    where = { ...where, active: params.active.toLowerCase() === "true" };
  if (params.createdAt) where = { ...where, createdAt: params.createdAt };
  if (params.sorter) {
    const sorting = params.sorter.split("_");
    order.push([
      sorting[0],
      sorting[1].toLowerCase() === "ascend" ? "ASC" : "DESC",
    ]);
  }

  const data = await Brands.scope("basic").findAll({ where, order });
  return res.status(httpStatus.OK).json({ data });
};



export const getBrand = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {id}: any = req.params;

  const data = await Brands.findByPk(id);

  return res.json({
    data: data,
  });
};


export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let values = req.body;
  values = {
    ...values,
    logo1: values.logo ? values.logo[0]?.url : null,
    storyCover: values.storyCover ? values.storyCover[0]?.url : null,
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Brands.create(values).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.CREATED).json({ data });
};

export const uploadImage = async (
  req: Request | any,
  res: Response
): Promise<Response> => {
  const data = req.file;
  return res.status(httpStatus.OK).json({ data });
};
