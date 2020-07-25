import Categories from "../models/Categories";
import { Request, Response } from "express";
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
        as: "childrens",
        include: [{ model: Categories.scope("basic"), as: "childrens" }],
      },
    ],
  });
  return res.json({ data });
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  let values = req.body;
  values = {
    ...values,
    image:
      values.image && values.image.length > 0 ? values.image[0]?.url : null,
    storyCover:
      values.storyCover && values.storyCover.length > 0
        ? values.storyCover[0]?.url
        : null,
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Categories.create(values).catch((err) =>
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
  let values = req.body;
  values = {
    ...values,
    image:
      values.image && values.image.length > 0 ? values.image[0]?.url : null,
    storyCover:
      values.storyCover && values.storyCover.length > 0
        ? values.storyCover[0]?.url
        : null,
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Categories.update(values, { where: { id } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).json({ data });
};

export const getCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id }: any = req.params;

  const data = await Categories.findByPk(id);

  return res.json({
    data: data,
  });
};

export const toggleActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const data = await Categories.findOne({ where: { id: id } })
    .then((category) => {
      category?.toggelChildes();
      return category;
    })
    .then((category) => {
      category?.update({ active: literal("NOT active") });
      return category;
    });

  return res.json({ success: true, data });
};

export const bulkDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ids = req.query;
  const araryOfids: any[] = Object.values(ids);
  await Categories.destroy({ where: { id: araryOfids } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).send();
};
