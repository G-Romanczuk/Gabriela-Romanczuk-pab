import mongoose, { Document, Schema } from "mongoose";
import { stolikModel } from "./StolikModel";
import { pracownikModel } from "./PracownikModel";
import { danieModel } from "./DanieModel";
import { number } from "joi";
export interface IZamowienie {
  Employee: mongoose.Schema.Types.ObjectId;
  Meal: [mongoose.Schema.Types.ObjectId];
  Status: string;
  Table: mongoose.Schema.Types.ObjectId;
  Price: number;
}

//#region schema
export interface IZamowienieModel extends IZamowienie, Document {}

const ZamowienieSchema = new Schema<IZamowienie>(
  {
    Employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pracownik",
      required: true,
      validate: {
        validator: async function (value: mongoose.Schema.Types.ObjectId) {
          const table = await pracownikModel
            .find()
            .where("_id")
            .equals(value)
            .exec();
          if (table.length == 0) throw new Error("Nie ma takiego pracownika!");
        },
      },
    },
    Meal: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Danie",
      required: true,
      validate: {
        validator: async function (value: [mongoose.Schema.Types.ObjectId]) {
          const table = await danieModel
            .find()
            .where("_id")
            .equals(value)
            .exec();
          if (table.length == 0) throw new Error("Nie ma takiego dania!");
        },
      },
    },
    Status: {
      type: String,
      enum: ["Złożone", "W realizacji", "Zrealizowane", "Rachunek"],
      default: "Złożone",
    },
    Table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stolik",
      required: true,
      validate: {
        validator: async function (value: mongoose.Schema.Types.ObjectId) {
          const table = await stolikModel
            .find()
            .where("_id")
            .equals(value)
            .exec();
          if (table.length == 0) throw new Error("Nie ma takiego stolika!");
        },
      },
    },
    Price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
//#endregion

//#region walidacje

//#endregion
export const zamowienieModel = mongoose.model<IZamowienie>(
  "Zamowienie",
  ZamowienieSchema
);
