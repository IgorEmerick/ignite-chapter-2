import { getRepository, Repository } from "typeorm";

import ICreateUserTokenDTO from "../../../dto/ICreateUserTokenDTO";
import IUserTokensRepository from "../../../repositories/IUserTokensRepository";
import UserToken from "../entities/UserToken";

export default class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  public async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    await this.repository.save(userToken);

    return userToken;
  }
}
