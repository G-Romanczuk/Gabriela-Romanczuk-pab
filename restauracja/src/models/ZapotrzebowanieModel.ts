import mongoose, { Document, Schema } from "mongoose";
import { produktModel } from "./ProduktModel";
export interface IZapotrzebowanie {
    Product: mongoose.Schema.Types.ObjectId
  Name: string;
  Quantity: number;
  Measure: string;
}

//#region schema
export interface IZapotrzebowanieModel extends IZapotrzebowanie, Document {}

const ZapotrzebowanieSchema = new Schema<IZapotrzebowanie>(
  {
      Product:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produkt",
        validate: {
            validator: async function (value: mongoose.Schema.Types.ObjectId) {
              const stolik = await produktModel
                .find()
                .where("_id")
                .equals(value)
                .exec();
              if (stolik.length == 0) throw new Error("Nie ma takiego produktu!");
            },
          },
      },
    Name: {
      type: String,
      required: true,
      maxlength: 254,
    },
    Quantity: {
      type: Number,
      required: true,
    },
    Measure: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: false,
  }
);
//#endregion

//#region walidacje

//#endregion
export const zapotrzebowanieModel = mongoose.model<IZapotrzebowanie>("Zapotrzebowanie", ZapotrzebowanieSchema);
