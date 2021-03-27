import { Request, Response } from "express";

import CreateCategoryService from "../../services/CreateCategoryService";

export default class CreateCategoryController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createCategoryService: CreateCategoryService) { }

  public handle(req: Request, res: Response): Response {
    const { name, description } = req.body;

    const category = this.createCategoryService.execute({ description, name });

    return res.status(201).json(category);
  }
}
