import { inject, injectable } from "tsyringe";

import AppError from "../../../shared/errors/AppError";
import IDateProvider from "../../../shared/providers/dateProvider/IDateProvider";
import ICarsRepository from "../../cars/repositories/ICarsRepository";
import Rental from "../infra/typeorm/entities/Rental";
import IRentalsRepository from "../repositories/IRentalsRepository";

@injectable()
export default class DevolutionRentalService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository,

    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  public async execute(rental_id: string): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(rental_id);

    if (!rental || rental.end_date !== null) {
      throw new AppError("This rental has already closed or doesn't exists!");
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new Error("Car exists in rental but not in car's repository!");
    }

    const expectedTime = await this.dateProvider.compareInDays(
      rental.start_date,
      rental.expected_return_date
    );

    const dateNow = new Date();

    const exceededTime = await this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow
    );

    let total = expectedTime * car.fine_amount;

    if (exceededTime > 0) {
      total += exceededTime * car.daily_rate;
    }

    rental.end_date = dateNow;

    rental.total = total;

    const closedRental = await this.rentalsRepository.update(rental);

    car.available = true;

    await this.carsRepository.update(car);

    return closedRental;
  }
}
