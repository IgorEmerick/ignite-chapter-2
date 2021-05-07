import { getRepository, Repository } from "typeorm";
import ICreateRentalDTO from "../../../dto/ICreateRentalDTO";
import IRentalsRepository from "../../../repositories/IRentalsRepository";
import Rental from "../entities/Rental";

export default class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  public async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    const newRental = await this.repository.save(rental);

    return newRental;
  }

  public async findOpenRentalByUserId(id: string): Promise<Rental | undefined> {
    const openRental = await this.repository.findOne(
      id,
      { where: { end_date: null } }
    );

    return openRental;
  }
}