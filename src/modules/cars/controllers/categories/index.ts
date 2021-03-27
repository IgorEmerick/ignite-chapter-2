import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import CreateCategoryService from "../../services/CreateCategoryService";
import ImportCategoriesService from "../../services/ImportCategoriesService";
import CreateCategoryController from "./CreateCategoryController";
import ImportCategoriesController from "./ImportCategoriesController";
import ListCategoriesController from "./ListCategoriesController";

const categoriesRepository = new CategoriesRepository();

const createCategoryService = new CreateCategoryService(categoriesRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryService
);

const listCategoriesController = new ListCategoriesController(
  categoriesRepository
);

const importCategoriesService = new ImportCategoriesService(
  createCategoryService
);

const importCategoriesController = new ImportCategoriesController(
  importCategoriesService
);

export {
  createCategoryController,
  listCategoriesController,
  importCategoriesController,
};
