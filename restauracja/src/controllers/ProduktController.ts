import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { produktModel } from "../models/ProduktModel";

const createProdukt = (req: Request, res: Response, next: NextFunction) => {
  const name = req.body.Name;
  const price = req.body.Price;
  const quantity = req.body.Quantity;
  const measure = req.body.Measure;

  const produkt = new produktModel({
    _id: new mongoose.Types.ObjectId(),
    Name: name,
    Price: price,
    Quantity: quantity,
    Measure: measure,
  });

  return produkt
    .save()
    .then((produkt) => res.status(201).json({ produkt }))
    .catch((error) => res.status(500).json({ error }));
};

const readProdukt = (req: Request, res: Response, next: NextFunction) => {
  const produktId = req.params.produktId;

  return produktModel
    .findById(produktId)
    .then((produkt) =>
      produkt
        ? res.status(200).json({ produkt })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return produktModel
    .find()
    .then((produkts) => res.status(200).json({ produkts }))
    .catch((error) => res.status(500).json({ error }));
};

const updateProdukt = (req: Request, res: Response, next: NextFunction) => {
  const produktId = req.params.produktId;

  return produktModel
    .findById(produktId)
    .then((produkt) => {
      if (produkt) {
        produkt.set(req.body);

        return produkt
          .save()
          .then((produkt) => res.status(201).json({ produkt }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteProdukt = (req: Request, res: Response, next: NextFunction) => {
  const produktId = req.params.produktId;

  return produktModel
    .findByIdAndDelete(produktId)
    .then((produkt) =>
      produkt
        ? res.status(201).json({ produkt, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createProdukt,
  readProdukt,
  readAll,
  updateProdukt,
  deleteProdukt,
};
