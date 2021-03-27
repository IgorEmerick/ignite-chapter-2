import { Router } from "express";
import multer from "multer";

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from "../modules/cars/controllers/categories";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoriesRoutes.post("/import", upload.single("file"), async (req, res) => {
  return importCategoriesController.handle(req, res);
});

export default categoriesRoutes;
