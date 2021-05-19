import { Request, Response } from "express";
import { container } from "tsyringe";

import RefreshTokenService from "../services/RefreshTokenService";

export default class RefreshTokenController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const token =
      req.body.token || req.headers["x-access-token"] || req.query.token;
    const refreshTokenService = container.resolve(RefreshTokenService);

    const refreshToken = await refreshTokenService.execute(token);

    return res.json(refreshToken);
  }
}
