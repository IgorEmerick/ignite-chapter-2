import { Request, Response } from "express";

import SpecificationsRepository from "../../repositories/SpecificationsRepository";

export default class ListSpecificationsController {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: SpecificationsRepository) { }

  public handle(req: Request, res: Response): Response {
    const specifications = this.specificationsRepository.list();

    return res.json(specifications);
  }
}
