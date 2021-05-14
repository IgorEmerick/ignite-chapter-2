import User from "../../modules/accounts/infra/typeorm/entities/User";
import FakeUsersRepository from "../../modules/accounts/repositories/fakes/FakeUsersRepository";
import IUsersRepository from "../../modules/accounts/repositories/IUsersRepository";
import Car from "../../modules/cars/infra/typeorm/entities/Car";
import FakeCarsRepository from "../../modules/cars/repositories/fakes/FakeCarsRepository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository";
import Rental from "../../modules/rentals/infra/typeorm/entities/Rental";
import FakeRentalsRepository from "../../modules/rentals/repositories/fakes/FakeRentalsRepository";
import IRentalsRepository from "../../modules/rentals/repositories/IRentalsRepository";
import DevolutionRentalService from "../../modules/rentals/services/DevolutionRentalService";
import IDateProvider from "../../shared/providers/dateProvider/IDateProvider";
import DayjsDateProvider from "../../shared/providers/dateProvider/implementations/DayjsDateProvider";

let usersRepository: IUsersRepository;
let carsRepository: ICarsRepository;
let rentalsRepository: IRentalsRepository;
let user: User;
let car: Car;
let rental: Rental;
let devolutionRentalService: DevolutionRentalService;
let dateProvider: IDateProvider;

describe("Devolution rental service", () => {
  beforeEach(async () => {
    usersRepository = new FakeUsersRepository();
    carsRepository = new FakeCarsRepository();
    rentalsRepository = new FakeRentalsRepository();
    dateProvider = new DayjsDateProvider();

    user = await usersRepository.create({
      driver_license: "1234",
      email: "test@test.com",
      name: "test",
      password: "test",
    });

    car = await carsRepository.create({
      brand: "some brand",
      daily_rate: 100,
      description: "car description",
      fine_amount: 50,
      license_plate: "1234",
      name: "test",
      category_id: "12",
    });

    rental = await rentalsRepository.create({
      car_id: car.id,
      expected_return_date: new Date(new Date().getTime() + 86400),
      user_id: user.id,
    });

    devolutionRentalService = new DevolutionRentalService(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
  });

  it("Should be able to close rental", async () => {
    const closedRental = await devolutionRentalService.execute(rental.id);

    expect(closedRental).toBeInstanceOf(Rental);
    expect(closedRental.end_date).not.toBe(undefined);
    expect(closedRental.total).toBe(50);
  });
});
