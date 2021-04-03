import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import FindUserService from "../modules/accounts/services/FindUserService";

interface IPayload {
  sub: string;
}

export default async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("Token missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "46d470c6f82da5849f2273c0ab982ed3"
    ) as IPayload;
    const findUserService = container.resolve(FindUserService);

    const user = findUserService.execute(user_id);

    if (!user) {
      throw new Error("User doesn't exists");
    }

    next();
  } catch {
    throw new Error("Invalid token");
  }
}