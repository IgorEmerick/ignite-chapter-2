import ICreateCarDTO from "../dto/ICreateCarDTO";
import IListCarsDTO from "../dto/IListCarsDTO";
import Car from "../infra/typeorm/entities/Car";

export default interface ICarsRepository {
  create(car: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  listAvailable(request: IListCarsDTO): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  update(car: Car): Promise<Car>;
}