import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";
import CreateCategoryService from "../../services/CreateCategoryService";
import CreateCategoryController from "./CreateCategoryController";
import ListCategoriesController from "./ListCategoriesController";

const categoriesRepository = new CategoriesRepository();
const createCategoryService = new CreateCategoryService(categoriesRepository);
const createCategoryController = new CreateCategoryController(
  createCategoryService
);
const listCategoriesController = new ListCategoriesController(
  categoriesRepository
);

export { createCategoryController, listCategoriesController };
