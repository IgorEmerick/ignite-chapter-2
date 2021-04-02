import ICreateCatedoryDTO from "../dto/ICreateCategoryDTO";
import { Category } from "../entities/Category";

export default interface ICategoriesRepository {
  create({ description, name }: ICreateCatedoryDTO): Promise<Category>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | undefined>;
}
