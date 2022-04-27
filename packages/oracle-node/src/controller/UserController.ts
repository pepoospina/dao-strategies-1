import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { AppDataSource } from "../data-source";

export class UserController {
  async all(request: Request, response: Response, next: NextFunction) {
    return AppDataSource.manager.find(User);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return AppDataSource.manager.findOne(User, request.params.id);
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return AppDataSource.manager.save(User, request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let userToRemove = await AppDataSource.manager.findOneBy(User, {
      id: request.params.id,
    });
    await AppDataSource.manager.remove(User, userToRemove);
  }
}
