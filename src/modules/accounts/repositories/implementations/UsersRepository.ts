import { getRepository, Repository } from "typeorm";
import ICreateUserDTO from "../../dto/ICreateUserDTO";
import User from "../../entities/User";
import IUsersRepository from "../IUsersRepository";

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
}