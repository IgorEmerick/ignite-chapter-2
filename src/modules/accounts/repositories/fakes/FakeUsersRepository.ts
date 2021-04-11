import ICreateUserDTO from "../../dto/ICreateUserDTO";
import IUpdateAvatarDTO from "../../dto/IUpdateAvatarDTO";
import User from "../../entities/User";
import IUsersRepository from "../IUsersRepository";

export default class FakeUsersRepository implements IUsersRepository {
  private usersRepository: User[] = [];

  public async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.usersRepository.push(user);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.usersRepository.find(
      foundUser => foundUser.email === email
    );

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.usersRepository.find(
      foundUser => foundUser.id === id
    );

    return user;
  }

  public async updateAvatar({ avatarFile, userId }: IUpdateAvatarDTO): Promise<void> {
    const user = this.usersRepository.find(
      foundUser => foundUser.id === userId
    );

    user.avatar = avatarFile;
  }
}