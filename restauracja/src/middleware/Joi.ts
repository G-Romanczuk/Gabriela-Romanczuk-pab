import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IRestauracja } from "../models/RestauracjaModel";
import Logging from "../library/Logging";
import { IPracownik } from "../models/PracownikModel";
import { IStolik } from "../models/StolikModel";
import { IRezerwacja } from "../models/RezerwacjaModel";
import { IDanie } from "../models/DanieModel";
import { IProdukt } from "../models/ProduktModel";
import { IZamowienie } from "../models/ZamowienieModel";

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
  stolik: {
    create: Joi.object<IStolik>({
      Name: Joi.string().required(),
      Capacity: Joi.number().required(),
      Status: Joi.string().required(),
    }),
    update: Joi.object<IStolik>({
      Name: Joi.string().required(),
      Capacity: Joi.number().required(),
      Status: Joi.string().required(),
    }),
  },
  // rezerwacja: {
  //   create: Joi.object<IRezerwacja>({
  //     Table: Joi.string().required(),
  //     Start: Joi.date().required(),
  //     End: Joi.date().required(),
  //     Client: Joi.string().required(),
  //   }),
  //   update: Joi.object<IRezerwacja>({
  //     Table: Joi.string().required(),
  //     Start: Joi.date().required(),
  //     End: Joi.date().required(),
  //     Client: Joi.string().required(),
  //   }),
  // },
  danie: {
    create: Joi.object<IDanie>({
      Name: Joi.string().required(),
      Price: Joi.number().required(),
      Category: Joi.string().required(),
    }),
    update: Joi.object<IDanie>({
      Name: Joi.string().required(),
      Price: Joi.number().required(),
      Category: Joi.string().required(),
    }),
  },
  produkt: {
    create: Joi.object<IProdukt>({
      Name: Joi.string().required(),
      Price: Joi.number().required(),
      Quantity: Joi.number().required(),
      Measure: Joi.string().required(),
    }),
    update: Joi.object<IProdukt>({
      Name: Joi.string().required(),
      Price: Joi.number().required(),
      Quantity: Joi.number().required(),
      Measure: Joi.string().required(),
    }),
  },
  zamowienie: {
    create: Joi.object<IZamowienie>({
      Employee: Joi.string().required(),
      Meal: Joi.string().required(),
      Status: Joi.string().required(),
      Table: Joi.string().required(),
      Price: Joi.number().required(),
    }),
    update: Joi.object<IZamowienie>({
      Employee: Joi.string().required(),
      Meal: Joi.string().required(),
      Status: Joi.string().required(),
      Table: Joi.string().required(),
      Price: Joi.number().required(),
    }),
  },
};
