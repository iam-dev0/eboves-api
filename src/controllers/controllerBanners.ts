import Banners from "../models/Banners";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { literal } from "sequelize";

export const getAll = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await Banners.findAll();
  return res.json({ data });
};

export const get = async (req: Request, res: Response): Promise<Response> => {
  const { id }: any = req.params;

  const data = await Banners.findByPk(id);
  return res.json({
    data: data,
  });
};

export const create = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const values = req.body;
  const data = await Banners.create(values).catch((err) =>
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
  const values = req.body;

  const data = await Banners.update(values, { where: { id } }).catch((err) =>
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

  await Banners.destroy({ where: { id: araryOfids } }).catch((err) =>
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

  const data = Banners.update(
    { active: literal("NOT active") },
    { where: { id: id } }
  );

  return res.json({ success: true, data });
};

//------------------------Webiste Controllers------------------------------------------//

export const getBanners = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const data = await Banners.scope("website")
    .findAll()
    .then((banners) => {
      const ObjectNotation: { [key: string]: Array<Banners> } = {};
      banners.map((banner: Banners) => {
        if (ObjectNotation[banner.type]) {
          ObjectNotation[banner.type].push(banner);
          return;
        }
        ObjectNotation[banner.type] = [banner];
      });
      return ObjectNotation;
    });

  return res.json({ data });
};
