import { Router } from "express";
import CreateRentalController from "../../../../modules/rentals/controllers/CreateRentalController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

export default rentalsRoutes;