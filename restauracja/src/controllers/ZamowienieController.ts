import { NextFunction, Request, Response } from "express";
import { string } from "joi";
import mongoose, { ObjectId } from "mongoose";
import { danieModel } from "../models/DanieModel";
import { zamowienieModel } from "../models/ZamowienieModel";

const createZamowienie = async (req: Request, res: Response, next: NextFunction) => {
  const employee = req.body.Employee;
  const meal = req.body.Meal;
  const status = req.body.Status;
  const table = req.body.Table;
  let price = req.body.Price;
  
  let calculatedPrice: number = 0
	let mealArray = []
	if (meal) {
		mealArray = meal.replace(':', ',').replace(';', ',').replace('.', ',').split(',')
    console.log(mealArray);
		for (const mealId of mealArray) {
      console.log(mealId);
			const meal = await danieModel.findById(mealId as unknown as ObjectId)
			if (meal) {
				const price = meal.Price
				if (price) calculatedPrice += price
			}
		}
	}
	if (!price) price = calculatedPrice



  const zamowienie = new zamowienieModel({
    _id: new mongoose.Types.ObjectId(),
    Employee: employee,
    Meal: mealArray,
    Status: status,
    Table: table,
    Price: price,
  });

  return zamowienie
    .save()
    .then((zamowienie) => res.status(201).json({ zamowienie }))
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

const filterEmployee = (req: Request, res: Response, next: NextFunction) => {
  var EmployeeId = req.params.EmployeeId
  console.log(EmployeeId);
  return zamowienieModel
    .find({ Employee: EmployeeId })
    .then((zamowienies) => res.status(200).json({ zamowienies }))
    .catch((error) => res.status(500).json({ error }));
};

const filterTable = (req: Request, res: Response, next: NextFunction) => {
  var TableId = req.params.TableId
  console.log(TableId);
  return zamowienieModel
    .find({ Table: TableId })
    .then((zamowienies) => res.status(200).json({ zamowienies }))
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
  filterEmployee,
  filterTable,
  updateZamowienie,
  deleteZamowienie,
};
