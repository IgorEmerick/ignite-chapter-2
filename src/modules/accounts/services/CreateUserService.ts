import { inject, injectable } from "tsyringe";
import ICreateUserDTO from "../dto/ICreateUserDTO";
import User from "../infra/typeorm/entities/User";
import IUsersRepository from "../repositories/IUsersRepository";
import { hash } from "bcrypt";
import AppError from "../../../shared/errors/AppError";

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
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      driver_license,
      email,
      name,
      password: passwordHash,
    });

    return user;
  }
}