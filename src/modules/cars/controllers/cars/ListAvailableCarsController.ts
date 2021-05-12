import { Request, Response } from "express";
import { container } from "tsyringe";
import ListAvailableCarsService from "../../services/cars/ListAvailableCarsService";

export default class ListAvailableCarsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { brand, category_id, name, } = req.query;
    const listAvailableCarsService = container.resolve(
      ListAvailableCarsService
    );

    const cars = await listAvailableCarsService.execute({
      brand: brand as string,
      category_id: category_id as string,
      name: name as string,
    });

    return res.json(cars);
  }
}