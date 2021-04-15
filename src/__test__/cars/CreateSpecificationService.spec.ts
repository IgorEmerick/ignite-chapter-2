import AppError from "../../shared/errors/AppError";
import Specification from "../../modules/cars/entities/Specification";
import FakeSpecificationsRepository from "../../modules/cars/repositories/fakes/FakeSpecificationsRepository";
import ISpecificationsRepository from "../../modules/cars/repositories/ISpecificationsRepository";
import CreateSpecificationService from "../../modules/cars/services/specifications/CreateSpecificationService";

let specificationsRepository: ISpecificationsRepository;
let createSpecificationService: CreateSpecificationService;

describe("Create specification service", () => {
  beforeEach(async () => {
    specificationsRepository = new FakeSpecificationsRepository();
    createSpecificationService = new CreateSpecificationService(
      specificationsRepository
    );
  });

  it("Should be able to create a new specification", async () => {
    const specification = await createSpecificationService.execute({
      description: "Test of create specification service",
      name: "Test specification"
    });

    expect(specification).toBeInstanceOf(Specification);
  });

  it(
    "Should not be able to create two new specifications with same name",
    async () => {
      expect(async () => {
        const firstSpecification = await createSpecificationService.execute({
          description: "Test of create specification service",
          name: "Test specification"
        });
        const secondSpecification = await createSpecificationService.execute({
          description: "Test of create specification service",
          name: "Test specification"
        });
      }).rejects.toBeInstanceOf(AppError);
    });
})