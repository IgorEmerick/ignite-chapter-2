import { Router } from "express";
import multer from "multer";
import CreateCategoryController from "../modules/cars/controllers/categories/createCategories/CreateCategoryController";
import ImportCategoriesController from "../modules/cars/controllers/categories/importCategories/ImportCategoriesController";
import ListCategoriesController from "../modules/cars/controllers/categories/listCategories/ListCategoriesController";

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
