import { Router } from "express";
import multer from "multer";

import uploadConfig from "../../../../config/Upload";
import CreateUserController from "../../../../modules/accounts/controllers/CreateUserController";
import UpdateUserAvatarController from "../../../../modules/accounts/controllers/UpdateUserAvatarController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"));
const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);

export default usersRoutes;
