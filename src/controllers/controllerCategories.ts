import Categories from "../models/Categories";
import { Request, Response } from "express";
import sequelize from "../db/db";
import bodyParser from "body-parser";

const query = `WITH RECURSIVE shoppingCategories AS
(
  SELECT id, name, categoryId, 1 AS depth, name AS path
    FROM categories
    WHERE categoryId IS NULL
  UNION ALL
  SELECT c.id, c.name, c.categoryId, sc.depth + 1, CONCAT(sc.path, ' > ', c.name)
    FROM shoppingCategories AS sc 
      JOIN categories AS c ON sc.id = c.categoryId
       WHERE c.active = 1
)
SELECT * FROM shoppingCategories;`;

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
