import ICreateCatedoryDTO from "../dto/ICreateCategoryDTO";
import { Category } from "../model/Category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";

export default class CreateCategoryService {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: ICategoriesRepository) { }

  public execute({ description, name }: ICreateCatedoryDTO): Category {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new Error("This category already exists!;");
    }

    const category = this.categoriesRepository.create({ description, name });

    return category;
  }
}
