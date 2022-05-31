import controller from "../controllers/ZapotrzebowanieController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const zapotrzebowanieRoutes = require("express").Router();

zapotrzebowanieRoutes
  .post(
    "/create",
    ValidateJoi(Schemas.zapotrzebowanie.create),
    controller.createZapotrzebowanie
  )
  .get("/get/:zapotrzebowanieId", controller.readZapotrzebowanie)
  .get("/get", controller.readAll)
  .get("/sort/:sort/:sortby", controller.sort)
  .patch(
    "/update/:zapotrzebowanieId",
    ValidateJoi(Schemas.zapotrzebowanie.update),
    controller.updateZapotrzebowanie
  )
  .delete("/delete/:zapotrzebowanieId", controller.deleteZapotrzebowanie);

module.exports = zapotrzebowanieRoutes;
