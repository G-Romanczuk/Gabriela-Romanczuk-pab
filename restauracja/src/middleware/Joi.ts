import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IRestauracja } from "../models/RestauracjaModel";
import Logging from "../library/Logging";
import { IPracownik } from "../models/PracownikModel";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logging.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  restauracja: {
    create: Joi.object<IRestauracja>({
      Name: Joi.string().required(),
      Address: Joi.string().required(),
      TelNumber: Joi.string().required(),
      NIP: Joi.string().required(),
      Email: Joi.string().required(),
      WWW: Joi.string().required(),
    }),
    update: Joi.object<IRestauracja>({
      Name: Joi.string().required(),
      Address: Joi.string().required(),
      TelNumber: Joi.string().required(),
      NIP: Joi.string().required(),
      Email: Joi.string().required(),
      WWW: Joi.string().required(),
    }),
  },
  pracownik: {
    create: Joi.object<IPracownik>({
      Name: Joi.string().required(),
      Surname: Joi.string().required(),
      Position: Joi.string().required(),
    }),
    update: Joi.object<IPracownik>({
      Name: Joi.string().required(),
      Surname: Joi.string().required(),
      Position: Joi.string().required(),
    }),
  },
};
