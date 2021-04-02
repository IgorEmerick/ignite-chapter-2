import { Router } from "express";
import multer from "multer";
import CreateCategoryController from "../modules/cars/controllers/categories/CreateCategoryController";
import ImportCategoriesController from "../modules/cars/controllers/categories/ImportCategoriesController";
import ListCategoriesController from "../modules/cars/controllers/categories/ListCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const importCategoriesController = new ImportCategoriesController();

categoriesRoutes.post("/", createCategoryController.handle);

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoriesController.handle
);

export default categoriesRoutes;
