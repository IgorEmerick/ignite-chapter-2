import { Router } from "express";

import AuthenticateUserController from "../../../../modules/accounts/controllers/AuthenticateUserController";
import RefreshTokenController from "../../../../modules/accounts/controllers/RefreshTokenController";
import SendForgotPasswordMailController from "../../../../modules/accounts/controllers/SendForgotPasswordMailController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const sendForgotPasswordMailController = new SendForgotPasswordMailController();

authenticateRoutes.post("/login", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenController.handle);
authenticateRoutes.post(
  "/forgot-password",
  sendForgotPasswordMailController.handle
);

export default authenticateRoutes;
