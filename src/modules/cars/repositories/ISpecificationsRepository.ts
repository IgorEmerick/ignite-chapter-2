import ICreateSpecificationDTO from "../dto/ICreateSpecificationDTO";
import Specification from "../entities/Specification";

export default interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification | undefined>;
  list(): Promise<Specification[]>;
}
