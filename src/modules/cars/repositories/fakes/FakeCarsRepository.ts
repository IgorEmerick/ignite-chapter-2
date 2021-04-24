import ICreateCarDTO from "../../dto/ICreateCarDTO";
import IListCarsDTO from "../../dto/IListCarsDTO";
import Car from "../../infra/typeorm/entities/Car";
import ICarsRepository from "../ICarsRepository";

export default class FakeCarsRepository implements ICarsRepository {
  private repository: Car[] = [];

  public async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.repository.push(car);

    return car;
  }

  public async findByLicensePlate(license_plate: string):
    Promise<Car | undefined> {
    const car = this.repository.find(
      foundCar => foundCar.license_plate === license_plate
    );

    return car;
  }

  public async listAvailable({
    brand,
    category_id,
    name,
  }: IListCarsDTO): Promise<Car[]> {
    const cars = this.repository
      .filter(car => car.available)
      .filter(car => brand ? car.brand === brand : true)
      .filter(car => category_id ? car.category_id === category_id : true)
      .filter(car => name ? car.name === name : true);

    return cars;
  }
}