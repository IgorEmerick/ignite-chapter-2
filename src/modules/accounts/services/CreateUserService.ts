import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dto/ICreateUserDTO";
import User from "../entities/User";
import IUsersRepository from "../repositories/IUsersRepository";

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = await this.usersRepository.create({
      driver_license,
      email,
      name,
      password,
    });

    return user;
  }
}