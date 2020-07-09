import Categories from "../models/Categories";
import { Request, Response } from "express";
import { Op } from "sequelize";

export interface SearchParams {
  sorter?: string;
  active?: string;
  name?: string;
  createdAt?: string;
  pageSize?: string;
  current?: string;
}

export const getAllCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await Categories.findAll({
    attributes: ["id", "name"],
    where: { categoryId: null },
  });
  return res.json(data);
};

export const getSubCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const {
    params: { categoryId },
  } = req;

  const data = await Categories.findAll({
    attributes: ["id", "name"],
    where: { categoryId },
  });

  return res.json(data);
};

export const getNestedCategories = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const params: SearchParams = req.query;

  let where = {};
  const order: any = [];

  where = { categoryId: null };
  if (params.name)
    where = {
      ...where,
      [Op.or]: [
        {
          name: {
            [Op.like]: `${params.name}%`,
          },
        },
        {
          "$childrens.name$": {
            [Op.like]: `${params.name}%`,
          },
        },
        {
          "$childrens.childrens.name$": {
            [Op.like]: `${params.name}%`,
          },
        },
      ],
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
    order.push([
      "childrens",
      sorting[0],
      sorting[1].toLowerCase() === "ascend" ? "ASC" : "DESC",
    ]);
    order.push([
      "childrens",
      "childrens",
      sorting[0],
      sorting[1].toLowerCase() === "ascend" ? "ASC" : "DESC",
    ]);
  }

  const data = await Categories.scope("basic").findAll({
    where,
    order,
    include: [
      {
        model: Categories.scope("basic"),
        include: [{ model: Categories.scope("basic") }],
      },
    ],
  });
  return res.json({ data });
};
