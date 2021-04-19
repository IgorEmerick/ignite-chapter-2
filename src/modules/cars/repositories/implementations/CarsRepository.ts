import { getRepository, Repository } from "typeorm";
import ICreateCarDTO from "../../dto/ICreateCarDTO";
import Car from "../../entities/Car";
import ICarsRepository from "../ICarsRepository";

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
}