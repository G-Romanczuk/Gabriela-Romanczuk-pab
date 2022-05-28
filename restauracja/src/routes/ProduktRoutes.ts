import controller from "../controllers/ProduktController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const produktRoutes = require("express").Router();

produktRoutes
  .post(
    "/create",
    ValidateJoi(Schemas.produkt.create),
    controller.createProdukt
  )
  .get("/get/:produktId", controller.readProdukt)
  .get("/get", controller.readAll)
  .patch(
    "/update/:produktId",
    ValidateJoi(Schemas.produkt.update),
    controller.updateProdukt
  )
  .delete("/delete/:produktId", controller.deleteProdukt);

module.exports = produktRoutes;
