import { Request, Response } from "express";
import { container } from 'tsyringe';
import CreateSpecificationService from "../../../services/specifications/CreateSpecificationService";

export default class CreateSpecificationController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;
    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );

    const specification = await createSpecificationService.execute({
      description,
      name,
    });

    return res.status(201).json(specification);
  }
}
