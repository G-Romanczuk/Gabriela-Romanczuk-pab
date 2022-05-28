import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { pracownikModel } from "../models/PracownikModel";

const createPracownik = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.Name;
  const surname = req.body.Surname;
  const position = req.body.Position;

  const pracownik = new pracownikModel({
    _id: new mongoose.Types.ObjectId(),
    Name: name,
    Surname: surname,
    Position: position,
  });

  return pracownik
    .save()
    .then((pracownik) => res.status(201).json({ pracownik }))
    .catch((error) => res.status(500).json({ error }));
};

const readPracownik = (req: Request, res: Response, next: NextFunction) => {
  const pracownikId = req.params.pracownikId;

  return pracownikModel
    .findById(pracownikId)
    .then((pracownik) =>
      pracownik
        ? res.status(200).json({ pracownik })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return pracownikModel
    .find()
    .then((pracowniks) => res.status(200).json({ pracowniks }))
    .catch((error) => res.status(500).json({ error }));
};

const updatePracownik = (req: Request, res: Response, next: NextFunction) => {
  const pracownikId = req.params.pracownikId;

  return pracownikModel
    .findById(pracownikId)
    .then((pracownik) => {
      if (pracownik) {
        pracownik.set(req.body);

        return pracownik
          .save()
          .then((pracownik) => res.status(201).json({ pracownik }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deletePracownik = (req: Request, res: Response, next: NextFunction) => {
  const pracownikId = req.params.pracownikId;

  return pracownikModel
    .findByIdAndDelete(pracownikId)
    .then((pracownik) =>
      pracownik
        ? res.status(201).json({ pracownik, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createPracownik,
  readPracownik,
  readAll,
  updatePracownik,
  deletePracownik,
};
