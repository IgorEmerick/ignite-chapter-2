import { Request, response, Response } from "express";
import { container } from "tsyringe";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UpdateUserAvatarController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const avatarFile = req.file.filename;

    await updateUserAvatarService.execute({ userId: id, avatarFile })

    return res.status(204).send();
  }
}