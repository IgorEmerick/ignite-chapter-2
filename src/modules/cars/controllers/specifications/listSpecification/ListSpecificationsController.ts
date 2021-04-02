import { Request, Response } from "express";
import SpecificationsRepository from "../../../repositories/implementations/SpecificationsRepository";
import { container } from 'tsyringe';

export default class ListSpecificationsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const specificationsRepository = container.resolve(SpecificationsRepository);

    const specifications = await specificationsRepository.list();

    return res.json(specifications);
  }
}
