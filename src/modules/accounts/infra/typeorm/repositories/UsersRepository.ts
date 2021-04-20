import { getRepository, Repository } from "typeorm";
import ICreateUserDTO from "../../../dto/ICreateUserDTO";
import IUpdateAvatarDTO from "../../../dto/IUpdateAvatarDTO";
import User from "../entities/User";
import IUsersRepository from "../../../repositories/IUsersRepository";

export default class UsersRepository implements IUsersRepository {
  private usersRepository: Repository<User>

  constructor() {
    this.usersRepository = getRepository(User);
  }

  public async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.usersRepository.create({
      driver_license,
      email,
      name,
      password,
    });

    await this.usersRepository.save(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ id });

    return user;
  }

  public async updateAvatar({
    avatarFile,
    userId,
  }: IUpdateAvatarDTO): Promise<void> {
    await this.usersRepository.update({ id: userId }, { avatar: avatarFile });
  }
}