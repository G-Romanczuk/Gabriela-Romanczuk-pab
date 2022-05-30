import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { rezerwacjaModel } from "../models/RezerwacjaModel";

const createRezerwacja = (req: Request, res: Response, next: NextFunction) => {
  const table = req.body.Table;
  const start = req.body.Start;
  const end = req.body.End;
  const client = req.body.Client;

  const rezerwacja = new rezerwacjaModel({
    Table: table,
    Start: start,
    End: end,
    Client: client,
  });

  return rezerwacja
    .save()
    .then((rezerwacja) => res.status(201).json({ rezerwacja }))
    .catch((error) => res.status(500).json({ error }));
};

const readRezerwacja = (req: Request, res: Response, next: NextFunction) => {
  const rezerwacjaId = req.params.rezerwacjaId;

  return rezerwacjaModel
    .findById(rezerwacjaId)
    .then((rezerwacja) =>
      rezerwacja
        ? res.status(200).json({ rezerwacja })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return rezerwacjaModel
    .find()
    .then((rezerwacjas) => res.status(200).json({ rezerwacjas }))
    .catch((error) => res.status(500).json({ error }));
};

const updateRezerwacja = (req: Request, res: Response, next: NextFunction) => {
  const rezerwacjaId = req.params.rezerwacjaId;

  return rezerwacjaModel
    .findById(rezerwacjaId)
    .then((rezerwacja) => {
      if (rezerwacja) {
        rezerwacja.set(req.body);

        return rezerwacja
          .save()
          .then((rezerwacja) => res.status(201).json({ rezerwacja }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteRezerwacja = (req: Request, res: Response, next: NextFunction) => {
  const rezerwacjaId = req.params.rezerwacjaId;

  return rezerwacjaModel
    .findByIdAndDelete(rezerwacjaId)
    .then((rezerwacja) =>
      rezerwacja
        ? res.status(201).json({ rezerwacja, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createRezerwacja,
  readRezerwacja,
  readAll,
  updateRezerwacja,
  deleteRezerwacja,
};
