import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import ICreateCarSpecificationsDTO from "../../dto/ICreateCarSpecificationsDTO";
import Car from "../../infra/typeorm/entities/Car";
import Specification from "../../infra/typeorm/entities/Specification";
import ICarsRepository from "../../repositories/ICarsRepository";
import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

@injectable()
export default class CreateCarSpecificationsService {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  public async execute({
    car_id,
    specifications_id,
  }: ICreateCarSpecificationsDTO): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("This car doesn't exists!");
    }

    let specifications: Specification[] = [];

    if (carExists.specifications) {
      const oldSpecificationsId: string[] = [];

      carExists.specifications.forEach(specification => {
        if (!specifications_id.includes(specification.id)) {
          oldSpecificationsId.push(specification.id);
        }
      });

      const newSpecificationsId = specifications_id.concat(oldSpecificationsId);

      specifications = await this.specificationsRepository.findByIds(
        newSpecificationsId
      );
    } else {
      specifications = await this.specificationsRepository.findByIds(
        specifications_id
      );
    }

    carExists.specifications = specifications;

    const car = await this.carsRepository.update(carExists);

    return car;
  }
}