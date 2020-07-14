import { Request, Response } from "express";
import Outlets from "../models/Outlets";
import { Op, literal } from "sequelize";
import httpStatus from "http-status";

export interface SearchParams {
  sorter?: string;
  active?: string;
  name?: string;
  createdAt?: string;
  pageSize?: string;
  current?: string;
}

export const getOutlets = async (
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

  const data = await Outlets.findAll({ where, order });
  return res.status(httpStatus.OK).json({ data });
};

export const toggleActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const data = Outlets.update(
    { active: literal("NOT active") },
    { where: { id: id } }
  );

  return res.json({ success: true, data });
};

export const bulkDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ids = req.query;
  const araryOfids: any[] = Object.values(ids);
  await Outlets.destroy({ where: { id: araryOfids } }).catch((err) =>
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
  const data = await Outlets.create(req.body).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.CREATED).json({ data });
};

export const update = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const attribue = await Outlets.update(req.body, {
    where: { id },
  }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).json({ data: attribue });
};
