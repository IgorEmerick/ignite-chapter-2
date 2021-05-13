import { Router } from "express";

import CreateRentalController from "../../../../modules/rentals/controllers/CreateRentalController";
import DevolutionRentalController from "../../../../modules/rentals/controllers/DevolutionRentalController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.put(
  "/:rental_id",
  ensureAuthenticated,
  devolutionRentalController.handle
);

export default rentalsRoutes;
