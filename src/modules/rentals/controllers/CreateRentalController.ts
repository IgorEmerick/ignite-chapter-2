import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateRentalService from "../services/CreateRentalService";

export default class CreateRentalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const { car_id, expected_return_date } = req.body;
    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      car_id,
      expected_return_date,
      user_id: id,
    });

    return res.status(201).json(rental);
  }
}