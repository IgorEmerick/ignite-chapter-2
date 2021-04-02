import { inject, injectable } from 'tsyringe';
import Specification from '../../entities/Specification';
import ISpecificationsRepository from '../../repositories/ISpecificationsRepository';

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