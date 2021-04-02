import { Request, Response } from "express";
import SpecificationsRepository from "../../../repositories/implementations/SpecificationsRepository";

export default class ListSpecificationsController {
  private specificationsRepository = new SpecificationsRepository();

  public async handle(req: Request, res: Response): Promise<Response> {
    const specifications = await this.specificationsRepository.list();

    return res.json(specifications);
  }
}
