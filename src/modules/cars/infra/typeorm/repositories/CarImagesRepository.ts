import { inject } from "tsyringe";
import { getRepository, Repository } from "typeorm";
import ICreateCarImageDTO from "../../../dto/ICreateCarImageDTO";
import ICarImagesRepository from "../../../repositories/ICarImagesRepository";
import CarImage from "../entities/CarImage";

export default class CarImageRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  public async create({
    car_id,
    image_name,
  }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}