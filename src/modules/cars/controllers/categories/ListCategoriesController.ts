import { Request, Response } from "express";
import { container } from 'tsyringe';
import ListCategoriesService from "../../services/categories/ListCategoriesService";

export default class ListCategoriesController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);

    const categories = await listCategoriesService.execute();

    return res.json(categories);
  }
}
