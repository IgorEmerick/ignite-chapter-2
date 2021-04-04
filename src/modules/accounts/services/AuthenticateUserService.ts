import { inject, injectable } from "tsyringe";
import IAuthenticateUserDTO from "../dto/IAuthenticateUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import IAuthenticatedUserDTO from "../dto/IAuthenticatedUserDTO";
import AppError from "../../../errors/AppError";

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({
    email,
    password,
  }: IAuthenticateUserDTO): Promise<IAuthenticatedUserDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "46d470c6f82da5849f2273c0ab982ed3", {
      subject: user.id,
      expiresIn: "1d"
    });

    const authenticatedUser: IAuthenticatedUserDTO = {
      name: user.name,
      email: user.email,
      token
    }

    return authenticatedUser;
  }
}