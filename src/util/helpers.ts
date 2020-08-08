import { QureyParams } from "#root/controllers/controllerProducts";
import { Op } from "sequelize";

export const prepareWhere = (params: QureyParams): unknown => {
  let pWhere = {};
  let pvWhere = {};
  if (params.bestSeller)
    pWhere = {
      ...pWhere,
      bestSeller: params.bestSeller.toLowerCase() === "true",
    };
  if (params.trending)
    pWhere = { ...pWhere, trending: params.trending.toLowerCase() === "true" };
  if (params.topRated)
    pWhere = { ...pWhere, topRated: params.topRated.toLowerCase() === "true" };
  if (params.featured)
    pWhere = { ...pWhere, featured: params.featured.toLowerCase() === "true" };
  // if (params.pvTrending)
  //   where = {
  //     ...where,
  //     "$variations.trending$": params.pvTrending.toLowerCase() === "true",
  //   };
  // if (params.pvTopRated)
  //   where = {
  //     ...where,
  //     "$variations.topRated$": params.pvTopRated.toLowerCase() === "true",
  //   };
  // if (params.pvFeatured)
  //   where = {
  //     ...where,
  //     "$variations.featured$": params.pvFeatured.toLowerCase() === "true",
  //   };
  if (params.pricelte || params.pricegte)
    pvWhere = {
      ...pvWhere,
      "$variations.price$": {
        [Op.gte]: params.pricegte,
        [Op.lte]: params.pricelte,
      },
    };
  return { pWhere, pvWhere };
};
