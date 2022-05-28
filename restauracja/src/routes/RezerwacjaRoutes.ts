import controller from "../controllers/RezerwacjaController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const rezerwacjaRoutes = require("express").Router();

rezerwacjaRoutes
  .post(
    "/create",
    ValidateJoi(Schemas.rezerwacja.create),
    controller.createRezerwacja
  )
  .get("/get/:rezerwacjaId", controller.readRezerwacja)
  .get("/get", controller.readAll)
  .patch(
    "/update/:rezerwacjaId",
    ValidateJoi(Schemas.rezerwacja.update),
    controller.updateRezerwacja
  )
  .delete("/delete/:rezerwacjaId", controller.deleteRezerwacja);

module.exports = rezerwacjaRoutes;
