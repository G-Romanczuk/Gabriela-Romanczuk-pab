import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { danieModel } from "../models/DanieModel";

const createDanie = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.Name;
  const price = req.body.Price;
  const category = req.body.Category;

  const danie = new danieModel({
    _id: new mongoose.Types.ObjectId(),
    Name: name,
    Price: price,
    Category: category,
  });

  return danie
    .save()
    .then((danie) => res.status(201).json({ danie }))
    .catch((error) => res.status(500).json({ error }));
};

const readDanie = (req: Request, res: Response, next: NextFunction) => {
  const danieId = req.params.danieId;

  return danieModel
    .findById(danieId)
    .then((danie) =>
      danie
        ? res.status(200).json({ danie })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return danieModel
    .find()
    .then((danies) => res.status(200).json({ danies }))
    .catch((error) => res.status(500).json({ error }));
};

const updateDanie = (req: Request, res: Response, next: NextFunction) => {
  const danieId = req.params.danieId;

  return danieModel
    .findById(danieId)
    .then((danie) => {
      if (danie) {
        danie.set(req.body);

        return danie
          .save()
          .then((danie) => res.status(201).json({ danie }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteDanie = (req: Request, res: Response, next: NextFunction) => {
  const danieId = req.params.danieId;

  return danieModel
    .findByIdAndDelete(danieId)
    .then((danie) =>
      danie
        ? res.status(201).json({ danie, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createDanie,
  readDanie,
  readAll,
  updateDanie,
  deleteDanie,
};
