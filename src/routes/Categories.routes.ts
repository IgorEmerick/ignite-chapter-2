import { Router } from "express";

import {
  createCategoryController,
  listCategoriesController,
} from "../modules/cars/controllers/categories";

const categoriesRoutes = Router();

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };
