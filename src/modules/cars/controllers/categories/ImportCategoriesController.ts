import { Request, Response } from "express";
import { container } from 'tsyringe';

import { Category } from "../../entities/Category";
import ImportCategoriesService from "../../services/categories/ImportCategoriesService";

export default class ImportCategoriesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const importCategoriesService = container.resolve(ImportCategoriesService);

    const categories: Category[] = await importCategoriesService.execute(
      file
    );

    return res.status(201).json(categories);
  }
}
