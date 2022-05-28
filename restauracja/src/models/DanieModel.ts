import mongoose, { Document, Schema } from "mongoose";
export interface IDanie {
  Name: string;
  Price: number;
  Category: string;
}

//#region schema
export interface IDanieModel extends IDanie, Document {}

const DanieSchema = new Schema<IDanie>(
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
    Category: {
      type: String,
      required: true,
      enum: ["Pizza", "Burger"],
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
export const danieModel = mongoose.model<IDanie>("Danie", DanieSchema);
