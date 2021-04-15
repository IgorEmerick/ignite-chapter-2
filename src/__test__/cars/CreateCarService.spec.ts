import "reflect-metadata";
import Car from "../../modules/cars/entities/Car";
import FakeCarsRepository from "../../modules/cars/repositories/fakes/FakeCarsRepository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository";
import CreateCarService from "../../modules/cars/services/cars/CreateCarService"

let createCarService: CreateCarService;
let carsRepository: ICarsRepository;

describe("create car service", () => {
  beforeEach(async () => {
    carsRepository = new FakeCarsRepository();
    createCarService = new CreateCarService(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarService.execute({
      brand: "brand",
      category_id: "category",
      daily_rate: 100,
      description: "Description car",
      fine_amount: 60,
      license_plate: "1234",
      name: "Name car",
    });

    expect(car).toBeInstanceOf(Car);
  });
});