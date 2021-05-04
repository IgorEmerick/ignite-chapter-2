import { inject, injectable } from "tsyringe";
import AppError from "../../../../shared/errors/AppError";
import ICreateCarImagesDTO from "../../dto/ICreateCarImagesDTO";
import CarImage from "../../infra/typeorm/entities/CarImage";
import ICarImagesRepository from "../../repositories/ICarImagesRepository";
import ICarsRepository from "../../repositories/ICarsRepository";

@injectable()
export default class UploadCarImageService {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,

    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  public async execute({
    car_id,
    images_name,
  }: ICreateCarImagesDTO): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("This car doesn't exists!");
    }

    images_name.forEach(image => {
      this.carImagesRepository.create({ car_id, image_name: image });
    });
  }
}