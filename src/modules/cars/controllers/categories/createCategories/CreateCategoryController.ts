import { Request, Response } from "express";

import CreateCategoryService from "../../../services/CreateCategoryService";

export default class CreateCategoryController {
  private createCategoryService: CreateCategoryService;

  constructor() {
    this.createCategoryService = new CreateCategoryService();
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const category = await this.createCategoryService.execute({ description, name });

    return res.status(201).json(category);
  }
}
