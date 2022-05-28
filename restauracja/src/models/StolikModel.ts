import mongoose, { Document, Schema } from "mongoose";
export interface IStolik {
  Name: string;
  Capacity: number;
  Status: string;
}

//#region schema
export interface IStolikModel extends IStolik, Document {}

const StolikSchema = new Schema<IStolik>(
  {
    Name: {
      type: String,
      required: true,
      maxlength: 254,
    },
    Capacity: {
      type: Number,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Wolny", "Zajety", "Niedostepny"],
      default: "Wolny",
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
export const stolikModel = mongoose.model<IStolik>("Stolik", StolikSchema);
