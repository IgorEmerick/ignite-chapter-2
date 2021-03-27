import ICreateSpecificationDTO from "../dto/ICreateSpecificationDTO";
import Specification from "../model/Specification";

export default interface ISpecificationsRepository {
  create({ description, name }: ICreateSpecificationDTO): Specification;
  findByName(name: string): Specification;
  list(): Specification[];
}
