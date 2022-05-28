import controller from "../controllers/PracownikController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const pracownikRoutes = require("express").Router();

pracownikRoutes
  .post(
    "/create",
    ValidateJoi(Schemas.pracownik.create),
    controller.createPracownik
  )
  .get("/get/:pracownikId", controller.readPracownik)
  .get("/get", controller.readAll)
  .patch(
    "/update/:pracownikId",
    ValidateJoi(Schemas.pracownik.update),
    controller.updatePracownik
  )
  .delete("/delete/:pracownikId", controller.deletePracownik);

module.exports = pracownikRoutes;
