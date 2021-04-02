import { Request, Response } from "express";
import CategoriesRepository from "../../../repositories/implementations/CategoriesRepository";

export default class ListCategoriesController {
  private categoriesRepository: CategoriesRepository;

  constructor() {
    this.categoriesRepository = new CategoriesRepository();
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const categories = await this.categoriesRepository.list();

    return res.json(categories);
  }
}
