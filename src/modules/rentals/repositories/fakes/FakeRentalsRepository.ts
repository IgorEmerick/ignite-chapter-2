import ICreateRentalDTO from "../../dto/ICreateRentalDTO";
import Rental from "../../infra/typeorm/entities/Rental";
import IRentalsRepository from "../IRentalsRepository";

export default class FakeRentalsRepository implements IRentalsRepository {
  private repository: Rental[] = [];

  public async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental | undefined> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.repository.push(rental);

    return rental;
  }

  public async findOpenRentalByUserId(id: string): Promise<Rental | undefined> {
    const openRental = this.repository.find((rental) => {
      return rental.user_id === id && rental.end_date === null;
    });

    return openRental;
  }

  public async update(rental: Rental): Promise<Rental> {
    let oldRental = this.repository.find(
      (oldRental) => oldRental.id === rental.id
    );

    oldRental = rental;

    return oldRental;
  }
}
