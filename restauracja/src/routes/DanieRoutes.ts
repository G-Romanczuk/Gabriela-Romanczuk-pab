import controller from "../controllers/DanieController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const danieRoutes = require("express").Router();

danieRoutes
  .post("/create", ValidateJoi(Schemas.danie.create), controller.createDanie)
  .get("/get/:danieId", controller.readDanie)
  .get("/get", controller.readAll)
  .patch(
    "/update/:danieId",
    ValidateJoi(Schemas.danie.update),
    controller.updateDanie
  )
  .delete("/delete/:danieId", controller.deleteDanie);

module.exports = danieRoutes;
