import { Router } from "express";

import CreateRentalController from "../../../../modules/rentals/controllers/CreateRentalController";
import DevolutionRentalController from "../../../../modules/rentals/controllers/DevolutionRentalController";
import ListRentalsByUserController from "../../../../modules/rentals/controllers/ListRentalsByUserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.put(
  "/:rental_id",
  ensureAuthenticated,
  devolutionRentalController.handle
);
rentalsRoutes.get("/", ensureAuthenticated, listRentalsByUserController.handle);

export default rentalsRoutes;
