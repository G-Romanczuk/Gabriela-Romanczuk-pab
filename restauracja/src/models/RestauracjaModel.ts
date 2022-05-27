import mongoose, { Document, Schema, ObjectId } from "mongoose";
export interface IRestauracja {
  Name: string;
  Address: string;
  TelNumber: string;
  NIP: string;
  Email: string;
  WWW: string;
}

//#region schema
// export interface IRestauracjaModel extends IRestauracja, Document {}

const RestauracjaSchema = new Schema<IRestauracja>(
  {
    Name: {
      type: String,
      required: true,
      maxlength: 254,
    },
    Address: {
      type: String,
      required: true,
      maxlength: 254,
    },
    TelNumber: {
      type: String,
      required: false,
      maxlength: 15,
      validate(value: string) {
        if (!validateNumber(value))
          throw new Error("Podano nieprawidłowy numer telefonu!");
      },
    },
    NIP: {
      type: String,
      required: true,
      // unique: true,
      maxlength: 13,
      // validate(value: string) {
      //   if (!validateNip(value))
      //     throw new Error("Podano nieprawidłowy numer NIP!");
      // },
    },
    Email: {
      type: String,
      required: false,
      maxlength: 60,
      validate(value: string) {
        if (!validateEmail(value))
          throw new Error("Podano nieprawidłowy email!");
      },
    },
    WWW: {
      type: String,
      required: false,
      maxlength: 254,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
//#endregion

//#region walidacje
function validateNumber(telNumber: string) {
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/;
  return phoneRegex.test(telNumber);
}

// function validateNip(nip: string) {
//   if (typeof nip !== "string") return false;

//   nip = nip.replace(/[\ \-]/gi, "");

//   let weight = [6, 5, 7, 2, 3, 4, 5, 6, 7];
//   let sum = 0;
//   let controlNumber = parseInt(nip.substring(9, 10));
//   let weightCount = weight.length;
//   for (let i = 0; i < weightCount; i++) {
//     sum += parseInt(nip.substring(i, 1)) * weight[i];
//   }

//   return sum % 11 === controlNumber;
// }

function validateEmail(email: string) {
  if (!email) return false;

  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  return emailRegex.test(email);
}
//#endregion
export const RestauracjaModel = mongoose.model<IRestauracja>(
  "Restauracja",
  RestauracjaSchema
);
