import ICreateSpecificationDTO from "../dto/ICreateSpecificationDTO";
import Specification from "../entities/Specification";
import SpecificationsRepository from "../repositories/implementations/SpecificationsRepository";

export default class CreateSpecificationService {
  private specificationsRepository = new SpecificationsRepository();

  public async execute({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("This specification already exists!");
    }

    const specification = await this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
