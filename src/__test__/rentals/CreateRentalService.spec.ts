import FakeCarsRepository from "../../modules/cars/repositories/fakes/FakeCarsRepository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository";
import Rental from "../../modules/rentals/infra/typeorm/entities/Rental";
import FakeRentalsRepository from "../../modules/rentals/repositories/fakes/FakeRentalsRepository";
import IRentalsRepository from "../../modules/rentals/repositories/IRentalsRepository";
import CreateRentalService from "../../modules/rentals/services/CreateRentalService"
import AppError from "../../shared/errors/AppError";
import dayjs from "dayjs";
import IDateProvider from "../../shared/providers/dateProvider/IDateProvider";
import DayjsDateProvider from "../../shared/providers/dateProvider/implementations/DayjsDateProvider";

let createRentalService: CreateRentalService;
let fakeRentalsRepository: IRentalsRepository;
let fakeCarsRepository: ICarsRepository;
let dateProvider: IDateProvider;

describe("Create rental", () => {
  const day = dayjs().add(2, "days").toDate();

  beforeEach(async () => {
    fakeRentalsRepository = new FakeRentalsRepository();
    fakeCarsRepository = new FakeCarsRepository();
    dateProvider = new DayjsDateProvider();
    createRentalService = new CreateRentalService(
      fakeRentalsRepository,
      fakeCarsRepository,
      dateProvider,
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await fakeCarsRepository.create({
      brand: 'Test brand',
      category_id: '000',
      daily_rate: 100,
      description: 'Test of rental',
      fine_amount: 160,
      license_plate: '0001',
      name: 'Car Test',
    });

    const rental = await createRentalService.execute({
      car_id: car.id,
      user_id: '222',
      expected_return_date: day,
    });

    expect(rental).toBeInstanceOf(Rental);
  });

  it(
    "Should not be able to create a new rental if car doesn't exists",
    async () => {
      expect(async () => {
        await fakeCarsRepository.create({
          brand: 'Test brand',
          category_id: '000',
          daily_rate: 100,
          description: 'Test of rental',
          fine_amount: 160,
          license_plate: '0001',
          name: 'Car Test',
        });

        await createRentalService.execute({
          car_id: '1111',
          user_id: '222',
          expected_return_date: day,
        });
      }).rejects.toBeInstanceOf(AppError);
    });

  it(
    "Should not be able to create a new rental if car is unavailable",
    async () => {
      expect(async () => {
        const car = await fakeCarsRepository.create({
          brand: 'Test brand',
          category_id: '000',
          daily_rate: 100,
          description: 'Test of rental',
          fine_amount: 160,
          license_plate: '0001',
          name: 'Car Test',
        });

        car.available = false;

        await fakeCarsRepository.update(car);

        await createRentalService.execute({
          car_id: car.id,
          user_id: '222',
          expected_return_date: day,
        });
      }).rejects.toBeInstanceOf(AppError);
    });

  it(
    "Should not be able to create a new rental if exists an open rental for same user",
    async () => {
      expect(async () => {
        const firstCar = await fakeCarsRepository.create({
          brand: 'Test brand',
          category_id: '000',
          daily_rate: 100,
          description: 'Test of rental',
          fine_amount: 160,
          license_plate: '0001',
          name: 'Car Test',
        });

        const secondCar = await fakeCarsRepository.create({
          brand: 'Test brand',
          category_id: '000',
          daily_rate: 100,
          description: 'Test of rental',
          fine_amount: 160,
          license_plate: '0002',
          name: 'Car Test',
        });

        await createRentalService.execute({
          car_id: firstCar.id,
          user_id: '222',
          expected_return_date: day,
        });

        await createRentalService.execute({
          car_id: secondCar.id,
          user_id: '222',
          expected_return_date: day,
        });
      }).rejects.toBeInstanceOf(AppError);
    });

  it(
    "Should not be able to create a new rental with invalid return time",
    async () => {
      expect(async () => {
        const car = await fakeCarsRepository.create({
          brand: 'Test brand',
          category_id: '000',
          daily_rate: 100,
          description: 'Test of rental',
          fine_amount: 160,
          license_plate: '0001',
          name: 'Car Test',
        });

        await createRentalService.execute({
          car_id: car.id,
          user_id: '222',
          expected_return_date: new Date(),
        });
      }).rejects.toBeInstanceOf(AppError);
    });
});