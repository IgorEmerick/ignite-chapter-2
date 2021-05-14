import { Request, Response } from "express";
import { container } from "tsyringe";

import ListRentalsByUserService from "../services/ListRentalsByUserService";

export default class ListRentalsByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const listRentalsByUserService = container.resolve(
      ListRentalsByUserService
    );

    const rentals = await listRentalsByUserService.execute(id);

    return res.json(rentals);
  }
}
