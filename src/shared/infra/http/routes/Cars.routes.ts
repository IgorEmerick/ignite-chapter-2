import { Router } from "express";
import CreateCarController from "../../../../modules/cars/controllers/cars/CreateCarController";
import ListAvailableCarsController from "../../../../modules/cars/controllers/cars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);

export default carsRoutes;