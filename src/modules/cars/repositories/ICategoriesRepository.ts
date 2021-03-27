import ICreateCatedoryDTO from "../dto/ICreateCategoryDTO";
import { Category } from "../model/Category";

export default interface ICategoriesRepository {
  create({ description, name }: ICreateCatedoryDTO): Category;
  list(): Category[];
  findByName(name: string): Category;
}
