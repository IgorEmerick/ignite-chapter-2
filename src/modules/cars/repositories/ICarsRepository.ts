import ICreateCarDTO from "../dto/ICreateCarDTO";
import Car from "../entities/Car";

export default interface ICarsRepository {
  create(car: ICreateCarDTO): Promise<Car>;
}