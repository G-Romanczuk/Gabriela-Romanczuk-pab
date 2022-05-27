// import Joi, { ObjectSchema } from "joi";
// import { NextFunction, Request, Response } from "express";
// import { IRestauracja } from "../models/RestauracjaModel";
// import Logging from "../library/Logging";

// export const ValidateJoi = (schema: ObjectSchema) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       await schema.validateAsync(req.body);

//       next();
//     } catch (error) {
//       Logging.error(error);

//       return res.status(422).json({ error });
//     }
//   };
// };

// export const Schemas = {
//   restauracja: {
//     create: Joi.object<IRestauracja>({
//       name: Joi.string().required(),
//       address: Joi.string().required(),
//       telNumber: Joi.string().required(),
//       nip: Joi.string().required(),
//       email: Joi.string().required(),
//       www: Joi.string().required(),
//     }),
//     update: Joi.object<IRestauracja>({
//       name: Joi.string().required(),
//       address: Joi.string().required(),
//       telNumber: Joi.string().required(),
//       nip: Joi.string().required(),
//       email: Joi.string().required(),
//       www: Joi.string().required(),
//     }),
//   },
//   //   book: {
//   //     create: Joi.object<IBook>({
//   //       author: Joi.string()
//   //         .regex(/^[0-9a-fA-F]{24}$/)
//   //         .required(),
//   //       title: Joi.string().required(),
//   //     }),
//   //     update: Joi.object<IBook>({
//   //       author: Joi.string()
//   //         .regex(/^[0-9a-fA-F]{24}$/)
//   //         .required(),
//   //       title: Joi.string().required(),
//   //     }),
//   //   },
// };
