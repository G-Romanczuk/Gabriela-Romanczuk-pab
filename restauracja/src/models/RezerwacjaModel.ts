import mongoose, { Document, Schema } from "mongoose";
import { stolikModel } from "./StolikModel";
export interface IRezerwacja {
  Table: mongoose.Schema.Types.ObjectId;
  Start: Date;
  End: Date;
  Client: string;
}

//#region schema
export interface IRezerwacjaModel extends IRezerwacja, Document {}

const RezerwacjaSchema = new Schema<IRezerwacja>(
  {
    Table: {
      type: Schema.Types.ObjectId,
      ref: "stolikModel",
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

    Start: {
      type: Date,
      required: true,
      validate(value: Date) {
        if (value <= new Date())
          throw new Error("Rezerwować można tylko przyszłe terminy!");
      },
    },
    End: {
      type: Date,
      required: true,
      validate(value: Date) {
        if (value <= new Date())
          throw new Error("Rezerwować można tylko przyszłe terminy!");
      },
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
export const rezerwacjaModel = mongoose.model<IRezerwacja>(
  "Rezerwacja",
  RezerwacjaSchema
);
