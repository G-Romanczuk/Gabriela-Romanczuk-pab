import mongoose, { Document, Schema } from "mongoose";
export interface IPracownik {
  Name: string;
  Surname: string;
  Position: string;
}

//#region schema
export interface IPracownikModel extends IPracownik, Document {}

const PracownikSchema = new Schema<IPracownik>(
  {
    Name: {
      type: String,
      required: true,
      maxlength: 254,
    },
    Surname: {
      type: String,
      required: true,
      maxlength: 254,
    },
    Position: {
      type: String,
      required: true,
      maxlength: 254,
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
export const pracownikModel = mongoose.model<IPracownik>(
  "Pracownik",
  PracownikSchema
);
