import ICreateSpecificationDTO from "../../dto/ICreateSpecificationDTO";
import Specification from "../../entities/Specification";
import SpecificationsRepository from "../../repositories/implementations/SpecificationsRepository";
import { inject, injectable } from 'tsyringe';
import AppError from "../../../../errors/AppError";

@injectable()
export default class CreateSpecificationService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepository
  ) { }

  public async execute({ description, name }: ICreateSpecificationDTO):
    Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository
      .findByName(
        name
      );

    if (specificationAlreadyExists) {
      throw new AppError("This specification already exists!");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
