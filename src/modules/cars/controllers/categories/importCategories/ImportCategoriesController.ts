import { Request, Response } from "express";

import { Category } from "../../../entities/Category";
import ImportCategoriesService from "../../../services/ImportCategoriesService";

export default class ImportCategoriesController {
  private importCategoriesService = new ImportCategoriesService();

  public async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const categories: Category[] = await this.importCategoriesService.execute(
      file
    );

    return res.status(201).json(categories);
  }
}
