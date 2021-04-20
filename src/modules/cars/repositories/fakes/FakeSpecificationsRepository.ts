import ICreateSpecificationDTO from "../../dto/ICreateSpecificationDTO";
import Specification from "../../infra/typeorm/entities/Specification";
import ISpecificationsRepository from "../../repositories/ISpecificationsRepository";

export default class FakeSpecificationsRepository implements
  ISpecificationsRepository {
  private specificationsRepository: Specification[] = [];

  public async create({ description, name }: ICreateSpecificationDTO):
    Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
      created_at: new Date()
    });

    this.specificationsRepository.push(specification);

    return specification;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = this.specificationsRepository.find(
      foundSpecification => foundSpecification.name === name
    );

    return specification;
  }
  public async list(): Promise<Specification[]> {
    return this.specificationsRepository;
  }

}