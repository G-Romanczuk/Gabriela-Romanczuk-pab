import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { zamowienieModel } from "../models/ZamowienieModel";

const createZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const employee = req.body.Employee;
  const meal = req.body.Meal;
  const status = req.body.Status;
  const table = req.body.Table;
  const price = req.body.Price;

  const zamowienie = new zamowienieModel({
    _id: new mongoose.Types.ObjectId(),
    Employee: employee,
    Meal: meal,
    Status: status,
    Table: table,
    Price: price,
  });

  return zamowienie
    .save()
    .then((zamowienie) => res.status(201).json({ zamowienie }))
    .catch((error) => res.status(500).json({ error }));
};

const readZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const zamowienieId = req.params.zamowienieId;

  return zamowienieModel
    .findById(zamowienieId)
    .then((zamowienie) =>
      zamowienie
        ? res.status(200).json({ zamowienie })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return zamowienieModel
    .find()
    .then((zamowienies) => res.status(200).json({ zamowienies }))
    .catch((error) => res.status(500).json({ error }));
};

const updateZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const zamowienieId = req.params.zamowienieId;

  return zamowienieModel
    .findById(zamowienieId)
    .then((zamowienie) => {
      if (zamowienie) {
        zamowienie.set(req.body);

        return zamowienie
          .save()
          .then((zamowienie) => res.status(201).json({ zamowienie }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteZamowienie = (req: Request, res: Response, next: NextFunction) => {
  const zamowienieId = req.params.zamowienieId;

  return zamowienieModel
    .findByIdAndDelete(zamowienieId)
    .then((zamowienie) =>
      zamowienie
        ? res.status(201).json({ zamowienie, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createZamowienie,
  readZamowienie,
  readAll,
  updateZamowienie,
  deleteZamowienie,
};
