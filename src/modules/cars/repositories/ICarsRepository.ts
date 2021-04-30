import ICreateCarDTO from "../dto/ICreateCarDTO";
import IListCarsDTO from "../dto/IListCarsDTO";
import Car from "../infra/typeorm/entities/Car";
import Specification from "../infra/typeorm/entities/Specification";

export default interface ICarsRepository {
  create(car: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  listAvailable(request: IListCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  updateSpecifications(id: string, specifications: Specification[]): Promise<Car>;
}