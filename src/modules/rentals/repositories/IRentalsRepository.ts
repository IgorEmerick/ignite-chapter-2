import ICreateRentalDTO from "../dto/ICreateRentalDTO";
import Rental from "../infra/typeorm/entities/Rental";

export default interface IRentalsRepository {
  create(rental: ICreateRentalDTO): Promise<Rental | undefined>;
  findOpenRentalByUserId(id: string): Promise<Rental | undefined>;
}