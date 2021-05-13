import { Request, Response } from "express";
import { container } from "tsyringe";

import DevolutionRentalService from "../services/DevolutionRentalService";

export default class DevolutionRentalController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { rental_id } = req.params;
    const devolutionRentalService = container.resolve(DevolutionRentalService);

    const rental = await devolutionRentalService.execute(rental_id);

    return res.status(201).json(rental);
  }
}
