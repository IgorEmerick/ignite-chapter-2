import { Router } from "express";
import CreateCarController from "../../../../modules/cars/controllers/cars/CreateCarController";
import CreateCarSpecificationsController from "../../../../modules/cars/controllers/cars/CreateCarSpecificationsController";
import ListAvailableCarsController from "../../../../modules/cars/controllers/cars/ListAvailableCarsController";
import UploadCarImagesController from "../../../../modules/cars/controllers/cars/UploadCarImagesController";
import { ensureAdmin } from "../middlewares/EnsureAdmin";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";
import uploadConfig from "../../../../config/Upload";
import multer from "multer";

const carsRoutes = Router();

const upload = multer(uploadConfig.upload("./tmp/cars"));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationsController = new CreateCarSpecificationsController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post(
  "/specifications",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationsController.handle
);
carsRoutes.post(
  "/images/:car_id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadCarImagesController.handle
);

export default carsRoutes;