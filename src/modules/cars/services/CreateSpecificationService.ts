import ICreateSpecificationDTO from "../dto/ICreateSpecificationDTO";
import Specification from "../model/Specification";
import ISpecificationsRepository from "../repositories/ISpecificationsRepository";

export default class CreateSpecificationService {
  // eslint-disable-next-line prettier/prettier
  constructor(private specificationsRepository: ISpecificationsRepository) { }

  execute({ description, name }: ICreateSpecificationDTO): Specification {
    const specificationAlreadyExists = this.specificationsRepository.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new Error("This specification already exists!");
    }

    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    return specification;
  }
}
