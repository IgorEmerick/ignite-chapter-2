import ICreateUserDTO from "../dto/ICreateUserDTO";
import IUpdateAvatarDTO from "../dto/IUpdateAvatarDTO";
import User from "../infra/typeorm/entities/User";

export default interface IUsersRepository {
  create(user: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  updateAvatar(user: IUpdateAvatarDTO): Promise<void>;
}