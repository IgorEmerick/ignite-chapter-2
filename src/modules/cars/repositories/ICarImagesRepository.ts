import ICreateCarImageDTO from "../dto/ICreateCarImageDTO";
import CarImage from "../infra/typeorm/entities/CarImage";

export default interface ICarImagesRepository {
  create(dto: ICreateCarImageDTO): Promise<CarImage>
}