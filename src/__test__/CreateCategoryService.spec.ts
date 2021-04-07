import AppError from "../errors/AppError";
import { Category } from "../modules/cars/entities/Category";
import FakeCategoriesRepository from "../modules/cars/repositories/fakes/FakeCategoriesRepository";
import ICategoriesRepository from "../modules/cars/repositories/ICategoriesRepository";
import CreateCategoryService from "../modules/cars/services/categories/CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoriesRepository: ICategoriesRepository;

describe("Create category service", () => {
  beforeEach(async () => {
    categoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(categoriesRepository);
  })

  it("Should be able to create a new category", async () => {
    const category = await createCategoryService.execute({
      description: "Test of create category service",
      name: "Create category test"
    });

    expect(category).toBeInstanceOf(Category);
  });

  it("Should not be able to create two new categories with same name", async () => {
    expect(async () => {
      const firstCategory = await createCategoryService.execute({
        description: "Test of create category service",
        name: "Create category test"
      });
      const secondCategory = await createCategoryService.execute({
        description: "Test of create category service",
        name: "Create category test"
      });
    }).rejects.toBeInstanceOf(AppError);
  })
});