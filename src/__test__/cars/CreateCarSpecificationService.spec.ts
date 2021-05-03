import FakeCarsRepository from "../../modules/cars/repositories/fakes/FakeCarsRepository";
import FakeSpecificationsRepository from "../../modules/cars/repositories/fakes/FakeSpecificationsRepository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository"
import ISpecificationsRepository from "../../modules/cars/repositories/ISpecificationsRepository";
import CreateCarSpecificationsService from "../../modules/cars/services/cars/CreateCarSpecificationsService";
import AppError from "../../shared/errors/AppError";

let carsRepository: ICarsRepository;
let createCarSpecificationsService: CreateCarSpecificationsService;
let specificationsRepository: ISpecificationsRepository;

describe("Create car specification", () => {
  beforeEach(async () => {
    carsRepository = new FakeCarsRepository();
    specificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationsService = new CreateCarSpecificationsService(
      carsRepository,
      specificationsRepository
    );
  });

  it(
    "Should not be able to add a new specification if car doesn't exists",
    async () => {
      expect(async () => {
        await createCarSpecificationsService.execute({
          car_id: "4321",
          specifications_id: ["12", "34"],
        });
      }).rejects.toBeInstanceOf(AppError);
    }
  );

  it("Should be able to add a new specification to the car", async () => {
    const car = await carsRepository.create({
      brand: "Brand",
      category_id: "category1",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 140,
      license_plate: "1234",
      name: "Car",
    });

    const specification1 = await specificationsRepository.create({
      description: "Description of specification test 1",
      name: "Specification test 1",
    });

    const specification2 = await specificationsRepository.create({
      description: "Description of specification test 2",
      name: "Specification test 2",
    });

    const finalCar = await createCarSpecificationsService.execute({
      car_id: car.id,
      specifications_id: [specification1.id, specification2.id],
    });

    expect(finalCar.specifications).toHaveLength(2);
  });

  it(
    "Should not be able to add a new specification if specification doesn't exists",
    async () => {
      const car = await carsRepository.create({
        brand: "Brand",
        category_id: "category1",
        daily_rate: 100,
        description: "Car description",
        fine_amount: 140,
        license_plate: "1234",
        name: "Car",
      });

      const specification1 = await specificationsRepository.create({
        description: "Description of specification test 1",
        name: "Specification test 1",
      });

      const finalCar = await createCarSpecificationsService.execute({
        car_id: car.id,
        specifications_id: [specification1.id, "specification2"],
      });

      expect(finalCar.specifications).toHaveLength(1);
    }
  );
});