import ICreateCatedoryDTO from "../../dto/ICreateCategoryDTO";
import { Category } from "../../entities/Category";
import ICategoriesRepository from "../ICategoriesRepository";
import { Repository, getRepository } from 'typeorm'

export default class CategoriesRepository implements ICategoriesRepository {
  private categoriesRepository: Repository<Category>

  constructor() {
    this.categoriesRepository = getRepository(Category);
  }

  public async create({ name, description }: ICreateCatedoryDTO):
    Promise<Category> {
    const category = this.categoriesRepository.create({
      name,
      description,
    })

    await this.categoriesRepository.save(category);

    return category;
  }

  public async list(): Promise<Category[]> {
    const categories = await this.categoriesRepository.find();

    return categories;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.categoriesRepository.findOne({ name });

    return category;
  }
}
