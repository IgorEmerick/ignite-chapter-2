import { Request, Response } from "express";
import { container } from "tsyringe";

import SendForgotPasswordMailService from "../services/SendForgotPasswordMailService";

export default class SendForgotPasswordMailController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const sendForgotPasswordMailService = container.resolve(
      SendForgotPasswordMailService
    );

    await sendForgotPasswordMailService.execute(email);

    return res.send();
  }
}
