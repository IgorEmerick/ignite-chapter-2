import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarService from "../../services/cars/CreateCarService";

export default class CreateCarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    } = req.body;
    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return res.status(201).json(car);
  }
}