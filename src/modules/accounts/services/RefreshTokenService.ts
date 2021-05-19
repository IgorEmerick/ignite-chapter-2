import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import Auth from "../../../config/Auth";
import AppError from "../../../shared/errors/AppError";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
export default class RefreshTokenService {
  constructor(
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository
  ) {}

  public async execute(refresh_token: string): Promise<string> {
    const { email, sub } = verify(
      refresh_token,
      Auth.secret_refresh_token
    ) as IPayload;

    const userToken = await this.userTokensRepository.findByRefreshToken(
      refresh_token
    );

    if (
      !userToken ||
      sub !== userToken.user_id ||
      userToken.expires_date.getTime() < new Date().getTime()
    ) {
      throw new AppError("Invalid refresh token!", 401);
    }

    await this.userTokensRepository.deleteById(userToken.id);

    const refreshToken = sign({ email }, Auth.secret_refresh_token, {
      subject: sub,
      expiresIn: Auth.expires_in_refresh_token,
    });

    await this.userTokensRepository.create({
      expires_date: new Date(new Date().getTime() + 2592000000),
      refresh_token: refreshToken,
      user_id: sub,
    });

    return refreshToken;
  }
}
