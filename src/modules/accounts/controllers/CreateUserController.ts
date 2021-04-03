import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../services/CreateUserService';

export default class CreateUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const {
      driver_license,
      email,
      name,
      password,
      username,
    } = req.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      driver_license,
      email,
      name,
      password,
      username,
    });

    return res.status(201).json(user);
  }
}