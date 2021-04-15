import { inject, injectable } from "tsyringe";
import ICreateCarDTO from "../../dto/ICreateCarDTO";
import Car from "../../entities/Car";
import ICarsRepository from "../../repositories/ICarsRepository";

@injectable()
export default class CreateCarService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  public async execute({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = await this.carsRepository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    return car;
  }
}