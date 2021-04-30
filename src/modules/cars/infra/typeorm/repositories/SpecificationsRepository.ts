import { getRepository, Repository } from "typeorm";
import ICreateSpecificationDTO from "../../../dto/ICreateSpecificationDTO";
import Specification from "../entities/Specification";
import ISpecificationsRepository from "../../../repositories/ISpecificationsRepository";

export default class SpecificationsRepository
  implements ISpecificationsRepository {
  private specificationsRepository: Repository<Specification>;

  constructor() {
    this.specificationsRepository = getRepository(Specification);
  }

  public async list(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.find();

    return specifications;
  }

  public async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.specificationsRepository.create({
      name,
      description,
    });

    await this.specificationsRepository.save(specification);

    return specification;
  }

  public async findByName(name: string): Promise<Specification | undefined> {
    const specification = await this.specificationsRepository.findOne({ name });

    return specification;
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.findByIds(ids);

    return specifications;
  }
}
