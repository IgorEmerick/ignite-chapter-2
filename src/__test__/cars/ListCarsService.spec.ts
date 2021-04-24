import Car from "../../modules/cars/infra/typeorm/entities/Car";
import FakeCarsRepository from "../../modules/cars/repositories/fakes/FakeCarsRepository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository";
import ListCarsService from "../../modules/cars/services/cars/ListCarsService";

let carsRepository: ICarsRepository;
let listCarsService: ListCarsService;

describe("List cars service", () => {
  beforeEach(async () => {
    carsRepository = new FakeCarsRepository();
    listCarsService = new ListCarsService(carsRepository);
  });

  it("Should be able to list all avalilable cars", async () => {
    const car = await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({});

    expect(cars).toContain(car);
  });

  it("Should be able to list all available cars by name", async () => {
    await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({ name: "Test 1" });

    expect(cars.length).toEqual(1);
  });

  it("Should be able to list all available cars by brand", async () => {
    await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({ brand: "Brand 1" });

    expect(cars.length).toEqual(1);
  });

  it("Should be able to list all available cars by category", async () => {
    await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({ category_id: "category1" });

    expect(cars.length).toEqual(1);
  });

  it("Should be able to list all available cars by name and brand", async () => {
    await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({ name: "Test 1", brand: "Brand 1" });

    expect(cars.length).toEqual(1);
  });

  it("Should be able to list all available cars by name and category", async () => {
    await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({ name: "Test 1", category_id: "category1" });

    expect(cars.length).toEqual(1);
  });

  it("Should be able to list all available cars by brand and category", async () => {
    await carsRepository.create({
      brand: "Brand 1",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "1",
      name: "Test 1",
      category_id: "category1",
    });

    await carsRepository.create({
      brand: "Brand 2",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "12",
      name: "Test 2",
      category_id: "category2",
    });

    await carsRepository.create({
      brand: "Brand 3",
      daily_rate: 100,
      description: "Test liest cars service",
      fine_amount: 140,
      license_plate: "123",
      name: "Test 3",
      category_id: "category3",
    });

    const cars = await listCarsService.execute({ brand: "Brand 1", category_id: "category1" });

    expect(cars.length).toEqual(1);
  });
});