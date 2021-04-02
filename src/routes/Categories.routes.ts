import { Router } from "express";
import multer from "multer";
import createCategoryController from '../modules/cars/controllers/categories/createCategories';
import listCategoriesController from '../modules/cars/controllers/categories/listCategories';
import importCategoriesController from '../modules/cars/controllers/categories/importCategories'

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController().handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController().handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), async (req, res) => {
  return importCategoriesController().handle(req, res);
});

export default categoriesRoutes;
