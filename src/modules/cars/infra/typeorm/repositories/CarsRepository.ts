import { getRepository, Repository } from "typeorm";
import ICreateCarDTO from "../../../dto/ICreateCarDTO";
import Car from "../entities/Car";
import ICarsRepository from "../../../repositories/ICarsRepository";
import IListCarsDTO from "../../../dto/IListCarsDTO";
import Specification from "../entities/Specification";

export default class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  public async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string):
    Promise<Car | undefined> {
    const car = await this.repository.findOne({ license_plate });

    return car;
  }

  public async listAvailable({
    brand,
    category_id,
    name,
  }: IListCarsDTO): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true });

    if (brand) {
      carsQuery.andWhere("cars.brand = :brand", { brand });
    }

    if (category_id) {
      carsQuery.andWhere("cars.category_id = :category_id", { category_id });
    }

    if (name) {
      carsQuery.andWhere("cars.name = :name", { name });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  public async findById(id: string): Promise<Car | undefined> {
    const car = await this.repository.findOne({ id });

    return car;
  }

  public async updateSpecifications(id: string, specifications: Specification[]):
    Promise<Car> {
    await this.repository.update(id, { specifications });

    const car = await this.repository.findOne(id);

    return car;
  }
}