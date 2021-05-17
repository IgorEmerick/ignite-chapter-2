import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Auth from "../../../config/Auth";
import AppError from "../../../shared/errors/AppError";
import IAuthenticatedUserDTO from "../dto/IAuthenticatedUserDTO";
import IAuthenticateUserDTO from "../dto/IAuthenticateUserDTO";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

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

    const token = sign({}, Auth.secret_token, {
      subject: user.id,
      expiresIn: Auth.expires_in_token,
    });

    const refreshToken = sign({ email }, Auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: Auth.expires_in_refresh_token,
    });

    await this.userTokensRepository.create({
      expires_date: new Date(new Date().getTime() + 2592000000),
      refresh_token: refreshToken,
      user_id: user.id,
    });

    const authenticatedUser: IAuthenticatedUserDTO = {
      name: user.name,
      email: user.email,
      token,
      refresh_token: refreshToken,
    };

    return authenticatedUser;
  }
}
