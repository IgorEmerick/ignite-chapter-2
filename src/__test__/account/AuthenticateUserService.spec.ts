import FakeUsersRepository from "../../modules/accounts/repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import AuthenticateUserService from "../../modules/accounts/services/AuthenticateUserService";
import CreateUserService from "../../modules/accounts/services/CreateUserService";
import AppError from "../../shared/errors/AppError";

let usersRepository: IUsersRepository;
let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;

describe('Authenticate user service', () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    authenticateUserService = new AuthenticateUserService(usersRepository);
    createUserService = new CreateUserService(usersRepository);

    const user = await createUserService.execute({
      driver_license: '1234',
      email: 'teste@user.com',
      name: 'teste',
      password: 'password',
    });
  });

  it('Should be able to authenticate user', async () => {
    const authenticatedUser = await authenticateUserService.execute({
      email: 'teste@user.com',
      password: 'password',
    });

    expect(authenticatedUser).toHaveProperty('token');
  });

  it(
    'Should not be able to authenticate an user if password is wrong',
    async () => {
      expect(async () => {
        await authenticateUserService.execute({
          email: 'teste@user.com',
          password: '1234',
        });
      }).rejects.toBeInstanceOf(AppError);
    }
  );

  it(
    "Shoul not be able to authenticate an user if he doesn't exists",
    async () => {
      expect(async () => {
        await authenticateUserService.execute({
          email: 'user@test.com',
          password: 'password',
        });
      }).rejects.toBeInstanceOf(AppError);
    }
  );
})