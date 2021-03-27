import ICreateCatedoryDTO from "../../dto/ICreateCategoryDTO";
import { Category } from "../../model/Category";
import ICategoriesRepository from "../ICategoriesRepository";

export default class CategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Category[];

  constructor() {
    this.categoriesRepository = [];
  }

  public create({ name, description }: ICreateCatedoryDTO): Category {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categoriesRepository.push(category);

    return category;
  }

  public list(): Category[] {
    return this.categoriesRepository;
  }

  public findByName(name: string): Category {
    const category = this.categoriesRepository.find(
      (category) => category.name === name
    );

    return category;
  }
}
