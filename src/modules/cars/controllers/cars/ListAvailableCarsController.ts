import { Request, Response } from "express";
import { container } from "tsyringe";
import ListAvailableCarsService from "../../services/cars/ListAvailableCarsService";

export default class ListAvailableCarsController {
  public async handle(req: Request, res: Response) {
    const { brand, category_id, name, } = req.query;
    const listAvailableCarsService = container.resolve(ListAvailableCarsService);

    const cars = await listAvailableCarsService.execute({
      brand: (brand ? brand.toString() : undefined),
      category_id: (category_id ? category_id.toString() : undefined),
      name: (name ? name.toString() : undefined),
    });

    return res.json(cars);
  }
}