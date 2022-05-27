import controller from "../controllers/RestauracjaController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const restauracjaRoutes = require("express").Router();

restauracjaRoutes
  .post(
    "/create",
    ValidateJoi(Schemas.restauracja.create),
    controller.createRestauracja
  )
  .get("/get/:restauracjaId", controller.readRestauracja)
  .get("/get", controller.readAll)
  .patch(
    "/update/:restauracjaId",
    ValidateJoi(Schemas.restauracja.update),
    controller.updateRestauracja
  )
  .delete("/delete/:restauracjaId", controller.deleteRestauracja);

module.exports = restauracjaRoutes;
