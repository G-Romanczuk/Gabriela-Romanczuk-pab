import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { RestauracjaModel } from "../models/RestauracjaModel";

const createRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.Name;
  const address = req.body.Address;
  const telNumber = req.body.TelNumber;
  const Nip = req.body.NIP;
  const email = req.body.Email;
  const www = req.body.WWW;

  const restauracja = new RestauracjaModel({
    _id: new mongoose.Types.ObjectId(),
    Name: name,
    Address: address,
    TelNumber: telNumber,
    NIP: Nip,
    Email: email,
    WWW: www,
  });

  return restauracja
    .save()
    .then((restauracja) => res.status(201).json({ restauracja }))
    .catch((error) => res.status(500).json({ error }));
};

const readRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const restauracjaId = req.params.restauracjaId;

  return RestauracjaModel.findById(restauracjaId)
    .then((restauracja) =>
      restauracja
        ? res.status(200).json({ restauracja })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return RestauracjaModel.find()
    .then((restauracjas) => res.status(200).json({ restauracjas }))
    .catch((error) => res.status(500).json({ error }));
};

const updateRestauracja = (req: Request, res: Response, next: NextFunction) => {
  const restauracjaId = req.params.restauracjaId;

  return RestauracjaModel.findById(restauracjaId)
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

  return RestauracjaModel.findByIdAndDelete(restauracjaId)
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
