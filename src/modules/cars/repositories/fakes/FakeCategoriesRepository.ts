import ICreateCategoryDTO from "../../dto/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import ICategoriesRepository from "../ICategoriesRepository";

export default class FakeCategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Category[] = [];

  public async create({ description, name }: ICreateCategoryDTO): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date()
    });

    this.categoriesRepository.push(category);

    return category;
  }

  public async list(): Promise<Category[]> {
    return this.categoriesRepository;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = this.categoriesRepository.find(
      foundCategory => foundCategory.name === name
    );

    return category;
  }
}