import { Request, Response } from "express";

import CreateSpecificationService from "../../services/CreateSpecificationService";

export default class CreateSpecificationController {
  // eslint-disable-next-line prettier/prettier
  constructor(private createSpecificationService: CreateSpecificationService) { }

  public handle(req: Request, res: Response): Response {
    const { name, description } = req.body;
    const specification = this.createSpecificationService.execute({
      description,
      name,
    });

    return res.status(201).json(specification);
  }
}
