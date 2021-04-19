import { Router } from "express";
import CreateCarController from "../modules/cars/controllers/cars/CreateCarController";

const carsRoutes = Router();

const createCarController = new CreateCarController();

carsRoutes.post("/", createCarController.handle);

export default carsRoutes;