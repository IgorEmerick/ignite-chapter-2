import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import AppError from "../shared/errors/AppError";
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
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "46d470c6f82da5849f2273c0ab982ed3"
    ) as IPayload;
    const findUserService = container.resolve(FindUserService);

    const user = await findUserService.execute(user_id);

    if (!user) {
      throw new AppError("User doesn't exists!", 401);
    }

    console.log(req.user);
    console.log(user_id);
    req.user = {
      id: user_id
    };
    console.log(req.user);

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}