import AppError from "../../shared/errors/AppError";
import User from "../../modules/accounts/entities/User";
import FakeUsersRepository from "../../modules/accounts/repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository"
import CreateUserService from "../../modules/accounts/services/CreateUserService";

let usersRepository: IUsersRepository;
let createUserService: CreateUserService;

describe('Create user service', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(usersRepository);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUserService.execute({
      driver_license: '1234',
      email: 'teste@user.com',
      name: 'teste',
      password: 'password',
    });

    expect(user).toBeInstanceOf(User);
  });

  it('Should not be able to create two new users with same email', async () => {
    expect(async () => {
      const user = await createUserService.execute({
        driver_license: '1234',
        email: 'teste@user.com',
        name: 'teste',
        password: 'password',
      });
      const sameUser = await createUserService.execute({
        driver_license: '1235',
        email: 'teste@user.com',
        name: 'same teste',
        password: 'same password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
})