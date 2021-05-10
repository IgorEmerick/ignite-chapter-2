import { inject, injectable } from "tsyringe";
import AppError from "../../../shared/errors/AppError";
import IDateProvider from "../../../shared/providers/dateProvider/IDateProvider";
import ICarsRepository from "../../cars/repositories/ICarsRepository";
import ICreateRentalDTO from "../dto/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";
import IRentalsRepository from "../repositories/IRentalsRepository";

@injectable()
export default class CreateRentalService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  public async execute({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const minHour = 24;

    const car = await this.carsRepository.findById(car_id);

    if (!car || !car.available) {
      throw new AppError("Car unavailable!");
    }

    const openRentalToUser = await this.rentalsRepository.findOpenRentalByUserId(
      user_id
    );

    if (openRentalToUser) {
      throw new AppError("User already have an open rental!");
    }

    const dateNow = new Date();

    const compare = await this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    if (compare < minHour) {
      throw new AppError("Expected return date must be 24 hours or more!");
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    car.available = false;

    await this.carsRepository.update(car);

    return rental;
  }
}