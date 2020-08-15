import Suppliers from "../models/Supplier";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { literal } from "sequelize";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await Suppliers.findAll({
    attributes: ["id", "active", "createdAt", ["companyName", "name"]],
  });

  return res.json({ data });
};

export const getOne = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id }: any = req.params;

  const data = await Suppliers.findByPk(id);

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
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Suppliers.create(values).catch((err) =>
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
    createdBy: 1,
    updatedBy: 1,
  };
  const data = await Suppliers.update(values, { where: { id } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).json({ data });
};

export const bulkDelete = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ids = req.query;
  const araryOfids: any[] = Object.values(ids);
  await Suppliers.destroy({ where: { id: araryOfids } }).catch((err) =>
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    })
  );

  return res.status(httpStatus.OK).send();
};

export const toggleActiveStatus = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  const data = Suppliers.update(
    { active: literal("NOT active") },
    { where: { id: id } }
  );

  return res.json({ success: true, data });
};
