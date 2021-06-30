import { inject } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import AppError from "../../../shared/errors/AppError";
import IMailProvider from "../../../shared/providers/mailProvider/IMailProvider";
import IUsersRepository from "../repositories/IUsersRepository";
import IUserTokensRepository from "../repositories/IUserTokensRepository";

export default class SendForgotPasswordMailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("EtherealMailProvider")
    private mailProvider: IMailProvider
  ) {}

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User doesn't exists!");
    }

    const token = uuidV4();

    const expires_date = new Date(new Date().getTime() + 10800000);

    await this.userTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    });

    await this.mailProvider.sendMail(
      email,
      "Recuperação de senha",
      `O link para o reset é ${token}`
    );
  }
}
