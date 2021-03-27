import SpecificationsRepository from "../../repositories/SpecificationsRepository";
import CreateSpecificationService from "../../services/CreateSpecificationService";
import CreateSpecificationController from "./CreateSpecificationController";
import ListSpecificationsController from "./ListSpecificationsController";

const specificationsRepository = new SpecificationsRepository();
const createSpecificationService = new CreateSpecificationService(
  specificationsRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);
const listSpecificationsController = new ListSpecificationsController(
  specificationsRepository
);

export { createSpecificationController, listSpecificationsController };
