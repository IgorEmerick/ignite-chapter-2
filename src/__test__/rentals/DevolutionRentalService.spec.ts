import CarsRepository from "../../modules/cars/infra/typeorm/repositories/CarsRepository";
import ICarsRepository from "../../modules/cars/repositories/ICarsRepository";
import RentalsRepository from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository";
import IRentalsRepository from "../../modules/rentals/repositories/IRentalsRepository";
import DevolutionRentalService from "../../modules/rentals/services/DevolutionRentalService";
import IDateProvider from "../../shared/providers/dateProvider/IDateProvider";
import DayjsDateProvider from "../../shared/providers/dateProvider/implementations/DayjsDateProvider";

let rentalsRepository: IRentalsRepository;
let carsRepository: ICarsRepository;
let dateProvider: IDateProvider;
let devolutionRentalService: DevolutionRentalService;

describe("Devolution rental service", () => {
  beforeEach(async () => {
    rentalsRepository = new RentalsRepository();
    carsRepository = new CarsRepository();
    dateProvider = new DayjsDateProvider();

    devolutionRentalService = new DevolutionRentalService(
      rentalsRepository,
      carsRepository,
      dateProvider
    );
  });

  it("Should be able to close rental", async () => {});
});
