import { inject, injectable } from 'tsyringe';
import Specification from '../../infra/typeorm/entities/Specification';
import ISpecificationsRepository from '../../infra/typeorm/repositories/ISpecificationsRepository';

@injectable()
export default class ListSpecificationsService {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationsRepository
  ) { }

  public async execute(): Promise<Specification[]> {
    const specifications = await this.specificationsRepository.list();

    return specifications;
  }
}