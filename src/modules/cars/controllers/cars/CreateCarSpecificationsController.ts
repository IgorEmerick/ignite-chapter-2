import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateCarSpecificationsService from "../../services/cars/CreateCarSpecificationsService";

export default class CreateCarSpecificationsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, specifications_id } = req.body;
    const createCarSpecificationsService = container.resolve(
      CreateCarSpecificationsService
    );

    const car = await createCarSpecificationsService.execute({
      car_id,
      specifications_id,
    });

    return res.status(201).json(car);
  }
}