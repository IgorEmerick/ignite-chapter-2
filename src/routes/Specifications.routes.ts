import { Router } from "express";

import {
  createSpecificationController,
  listSpecificationsController,
} from "../modules/cars/controllers/specifications";

const specificationsRoutes = Router();

specificationsRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationsRoutes.get("/", (req, res) => {
  return listSpecificationsController.handle(req, res);
});

export default specificationsRoutes;
