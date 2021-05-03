import { Router } from "express";
import CreateCarController from "../../../../modules/cars/controllers/cars/CreateCarController";
import CreateCarSpecificationsController from "../../../../modules/cars/controllers/cars/CreateCarSpecificationsController";
import ListAvailableCarsController from "../../../../modules/cars/controllers/cars/ListAvailableCarsController";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
);

export default carsRoutes;