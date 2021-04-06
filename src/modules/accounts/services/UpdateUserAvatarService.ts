import { inject, injectable } from "tsyringe";
import File from "../../../utils/File";
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
    const user = await this.usersRepository.findById(userId);
    const file = new File();
    const filename = `./tmp/avatar/${user.avatar}`;

    await file.deleteFile(filename);

    await this.usersRepository.updateAvatar({ avatarFile, userId, });
  }
}