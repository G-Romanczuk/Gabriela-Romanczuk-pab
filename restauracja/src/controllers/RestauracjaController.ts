import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Restauracja from "../models/RestauracjaModel";

const createRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  const { adress } = req.body;
  const { telNumber } = req.body;
  const { nip } = req.body;
  const { email } = req.body;
  const { www } = req.body;

  const restauracja = new Restauracja({
    _id: new mongoose.Types.ObjectId(),
    name,
    adress,
    telNumber,
    nip,
    email,
    www,
  });

  return restauracja
    .save()
    .then((restauracja) => res.status(201).json({ restauracja }))
    .catch((error) => res.status(500).json({ error }));
};

const readRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const restauracjaId = req.params.restauracjaId;

  return Restauracja.findById(restauracjaId)
    .then((restauracja) =>
      restauracja
        ? res.status(200).json({ restauracja })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return Restauracja.find()
    .then((restauracjas) => res.status(200).json({ restauracjas }))
    .catch((error) => res.status(500).json({ error }));
};

const updateRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const restauracjaId = req.params.restauracjaId;

  return Restauracja.findById(restauracjaId)
    .then((restauracja) => {
      if (restauracja) {
        restauracja.set(req.body);

        return restauracja
          .save()
          .then((restauracja) => res.status(201).json({ restauracja }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const restauracjaId = req.params.restauracjaId;

  return Restauracja.findByIdAndDelete(restauracjaId)
    .then((restauracja) =>
      restauracja
        ? res.status(201).json({ restauracja, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createRestauracja,
  readRestauracja,
  readAll,
  updateRestauracja,
  deleteRestauracja,
};
