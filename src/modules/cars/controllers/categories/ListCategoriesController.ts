import { Request, Response } from "express";

import CategoriesRepository from "../../repositories/implementations/CategoriesRepository";

export default class ListCategoriesController {
  // eslint-disable-next-line prettier/prettier
  constructor(private categoriesRepository: CategoriesRepository) { }

  public handle(req: Request, res: Response): Response {
    const categories = this.categoriesRepository.list();

    return res.json(categories);
  }
}
