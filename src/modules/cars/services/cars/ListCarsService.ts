import { inject } from "tsyringe";
import IListCarsDTO from "../../dto/IListCarsDTO";
import Car from "../../infra/typeorm/entities/Car";
import ICarsRepository from "../../repositories/ICarsRepository";

export default class ListCarsService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  public async execute({
    brand,
    category_id,
    name,
  }: IListCarsDTO): Promise<Car[]> {
    const cars = await this.carsRepository.listAvailable({
      brand,
      category_id,
      name,
    });

    return cars;
  }
}