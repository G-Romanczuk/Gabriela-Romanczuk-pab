import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { zapotrzebowanieModel } from "../models/ZapotrzebowanieModel";

const createZapotrzebowanie = (req: Request, res: Response, next: NextFunction) => {
  const product = req.body.Product
const name = req.body.Name;
  const quantity = req.body.Quantity;
  const measure = req.body.Measure;

  const zapotrzebowanie = new zapotrzebowanieModel({
    _id: new mongoose.Types.ObjectId(),
    Product:product,
    Name: name,
    Quantity: quantity,
    Measure: measure,
  });

  return zapotrzebowanie
    .save()
    .then((zapotrzebowanie) => res.status(201).json({ zapotrzebowanie }))
    .catch((error) => res.status(500).json({ error }));
};

const readZapotrzebowanie = (req: Request, res: Response, next: NextFunction) => {
  const zapotrzebowanieId = req.params.zapotrzebowanieId;

  return zapotrzebowanieModel
    .findById(zapotrzebowanieId)
    .then((zapotrzebowanie) =>
      zapotrzebowanie
        ? res.status(200).json({ zapotrzebowanie })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

const readAll = (req: Request, res: Response, next: NextFunction) => {
  return zapotrzebowanieModel
    .find()
    .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
    .catch((error) => res.status(500).json({ error }));
};

const sort = (req: Request, res: Response, next: NextFunction) => {
  const sortby = req.params.sortby;
  const sort = req.params.sort;

  switch (sort.toLocaleLowerCase()) {
    case "desc":
      switch (sortby.toLocaleLowerCase()) {
        case "name":
          return zapotrzebowanieModel
            .find()
            .sort({ Name: -1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
        case "price":
          return zapotrzebowanieModel
            .find()
            .sort({ Price: -1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
        case "quantity":
          return zapotrzebowanieModel
            .find()
            .sort({ Quantity: -1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
        case "measure":
          return zapotrzebowanieModel
            .find()
            .sort({ Measure: -1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
      }
    case "asc": {
      switch (sortby.toLocaleLowerCase()) {
        case "name":
          return zapotrzebowanieModel
            .find()
            .sort({ Name: 1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
        case "price":
          return zapotrzebowanieModel
            .find()
            .sort({ Price: 1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
        case "quantity":
          return zapotrzebowanieModel
            .find()
            .sort({ Quantity: 1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
        case "measure":
          return zapotrzebowanieModel
            .find()
            .sort({ Measure: 1 })
            .then((zapotrzebowanies) => res.status(200).json({ zapotrzebowanies }))
            .catch((error) => res.status(500).json({ error }));
      }
    }
  }
};

const updateZapotrzebowanie = (req: Request, res: Response, next: NextFunction) => {
  const zapotrzebowanieId = req.params.zapotrzebowanieId;

  return zapotrzebowanieModel
    .findById(zapotrzebowanieId)
    .then((zapotrzebowanie) => {
      if (zapotrzebowanie) {
        zapotrzebowanie.set(req.body);

        return zapotrzebowanie
          .save()
          .then((zapotrzebowanie) => res.status(201).json({ zapotrzebowanie }))
          .catch((error) => res.status(500).json({ error }));
      } else {
        return res.status(404).json({ message: "not found" });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const deleteZapotrzebowanie = (req: Request, res: Response, next: NextFunction) => {
  const zapotrzebowanieId = req.params.zapotrzebowanieId;

  return zapotrzebowanieModel
    .findByIdAndDelete(zapotrzebowanieId)
    .then((zapotrzebowanie) =>
      zapotrzebowanie
        ? res.status(201).json({ zapotrzebowanie, message: "Deleted" })
        : res.status(404).json({ message: "not found" })
    )
    .catch((error) => res.status(500).json({ error }));
};

export default {
  createZapotrzebowanie,
  readZapotrzebowanie,
  readAll,
  sort,
  updateZapotrzebowanie,
  deleteZapotrzebowanie,
};
