import { Router } from "express";
import CreateCarController from "../../../../modules/cars/controllers/cars/CreateCarController";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);

export default carsRoutes;