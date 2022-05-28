import mongoose, { Document, Schema } from "mongoose";
export interface IProdukt {
  Name: string;
  Price: number;
  Quantity: number;
  Measure: string;
}

//#region schema
export interface IProduktModel extends IProdukt, Document {}

const ProduktSchema = new Schema<IProdukt>(
  {
    Name: {
      type: String,
      required: true,
      maxlength: 254,
    },
    Price: {
      type: Number,
      required: true,
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
export const produktModel = mongoose.model<IProdukt>("Produkt", ProduktSchema);
