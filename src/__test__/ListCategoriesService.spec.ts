import { Category } from "../modules/cars/entities/Category";
import FakeCategoriesRepository from "../modules/cars/repositories/fakes/FakeCategoriesRepository";
import ICategoriesRepository from "../modules/cars/repositories/ICategoriesRepository";
import ListCategoriesService from "../modules/cars/services/categories/ListCategoriesService";

let categoriesRepository: ICategoriesRepository;
let listCategoriesService: ListCategoriesService;

describe("List categories service", () => {
  beforeEach(async () => {
    categoriesRepository = new FakeCategoriesRepository();
    listCategoriesService = new ListCategoriesService(categoriesRepository);
  });

  it("Should be able to list all categories", async () => {
    const categories = await listCategoriesService.execute();

    expect(categories.length).toBe(0);
  })
})