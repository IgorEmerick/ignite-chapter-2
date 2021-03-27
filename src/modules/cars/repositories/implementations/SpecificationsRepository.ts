import ICreateSpecificationDTO from "../../dto/ICreateSpecificationDTO";
import Specification from "../../model/Specification";
import ISpecificationsRepository from "../ISpecificationsRepository";

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private specificationsRepository: Specification[];

  constructor() {
    this.specificationsRepository = [];
  }

  list(): Specification[] {
    return this.specificationsRepository;
  }

  create({ description, name }: ICreateSpecificationDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specificationsRepository.push(specification);

    return specification;
  }

  findByName(name: string): Specification {
    return this.specificationsRepository.find(
      (specification) => specification.name === name
    );
  }
}
