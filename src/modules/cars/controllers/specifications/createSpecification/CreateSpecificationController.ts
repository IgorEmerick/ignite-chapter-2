import { Request, Response } from "express";

import CreateSpecificationService from "../../../services/CreateSpecificationService";

export default class CreateSpecificationController {
  private createSpecificationService: CreateSpecificationService;

  constructor() {
    this.createSpecificationService = new CreateSpecificationService();
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const specification = await this.createSpecificationService.execute({
      description,
      name,
    });

    return res.status(201).json(specification);
  }
}
