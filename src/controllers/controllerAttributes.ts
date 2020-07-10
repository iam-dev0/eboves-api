import Attributes from "../models/Attributes";
import { Request, Response } from "express";
import { Op, literal } from "sequelize";
import httpStatus from "http-status";
import { Http } from "winston/lib/winston/transports";

export interface SearchParams {
  sorter?: string;
  active?: string;
  name?: string;
  createdAt?: string;
  pageSize?: string;
  current?: string;
}

export const getAttributes = async (
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

  const data = await Attributes.findAll({ where, order });
  return res.json({ data });
};


export const toggleActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { Aid } = req.params;

  const data = Attributes.update(
    { active: literal("NOT active") },
    { where: { id: Aid } }
  );

  return res.json({ success: true, data });
};

export const bulkDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const Aids = req.query;
  const araryOfAids: any[] = Object.values(Aids);
  await Attributes.destroy({ where: { id: araryOfAids } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).send();
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const attribue = await Attributes.create(req.body).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.CREATED).json({ data: attribue });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { Aid } = req.params;
  const attribue = await Attributes.update(req.body, {
    where: { id: Aid },
  }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).json({ data: attribue });
};
