import { Request, Response } from "express";
import { container } from 'tsyringe'

import CreateCategoryService from "../../services/categories/CreateCategoryService";

export default class CreateCategoryController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({ description, name });

    return res.status(201).json(category);
  }
}
