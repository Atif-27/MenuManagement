import { Request, Response, NextFunction } from "express";

interface AsyncFunction {
  (req: Request, res: Response, next: NextFunction): Promise<void>;
}

// ! This is a utility function that wraps an async function of a controller with try-catch block
export default function asyncWrapper(func: AsyncFunction) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await func(req, res, next);
    } catch (error) {
      if ((error as any).code === 11000) {
        const key = Object.keys((error as any).keyValue)[0];
        (error as any).message = key + " already exists";
        (error as any).statusCode = 400;
      }
      next(error);
    }
  };
}
