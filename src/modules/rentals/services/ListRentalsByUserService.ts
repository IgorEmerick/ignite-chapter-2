import { inject, injectable } from "tsyringe";

import Rental from "../infra/typeorm/entities/Rental";
import IRentalsRepository from "../repositories/IRentalsRepository";

@injectable()
export default class ListRentalsByUserService {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  public async execute(user_id: string): Promise<Rental[]> {
    const rentals = await this.rentalsRepository.findByUserId(user_id);

    return rentals;
  }
}
