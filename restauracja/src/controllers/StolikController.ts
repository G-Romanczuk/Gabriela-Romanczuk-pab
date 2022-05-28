import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { stolikModel } from "../models/StolikModel";

const createStolik = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.Name;
  const capacity = req.body.Capacity;
  const status = req.body.Status;

  const stolik = new stolikModel({
    _id: new mongoose.Types.ObjectId(),
    Name: name,
    Capacity: capacity,
    Status: status,
  });

  return stolik
    .save()
    .then((stolik) => res.status(201).json({ stolik }))
    .catch((error) => res.status(500).json({ error }));
};

const readStolik = (req: Request, res: Response, next: NextFunction) => {
  const stolikId = req.params.stolikId;

  return stolikModel
    .findById(stolikId)
    .then((stolik) =>
      stolik
        ? res.status(200).json({ stolik })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return stolikModel
    .find()
    .then((stoliks) => res.status(200).json({ stoliks }))
    .catch((error) => res.status(500).json({ error }));
};

const updateStolik = (req: Request, res: Response, next: NextFunction) => {
  const stolikId = req.params.stolikId;

  return stolikModel
    .findById(stolikId)
    .then((stolik) => {
      if (stolik) {
        stolik.set(req.body);

        return stolik
          .save()
          .then((stolik) => res.status(201).json({ stolik }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteStolik = (req: Request, res: Response, next: NextFunction) => {
  const stolikId = req.params.stolikId;

  return stolikModel
    .findByIdAndDelete(stolikId)
    .then((stolik) =>
      stolik
        ? res.status(201).json({ stolik, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createStolik,
  readStolik,
  readAll,
  updateStolik,
  deleteStolik,
};
