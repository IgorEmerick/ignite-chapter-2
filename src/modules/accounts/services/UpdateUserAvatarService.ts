import { inject, injectable } from "tsyringe";
import IUpdateAvatarDTO from "../dto/IUpdateAvatarDTO";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({
    avatarFile,
    userId,
  }: IUpdateAvatarDTO): Promise<void> {
    await this.usersRepository.updateAvatar({ avatarFile, userId, });
  }
}