import controller from "../controllers/StolikController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const stolikRoutes = require("express").Router();

stolikRoutes
  .post("/create", ValidateJoi(Schemas.stolik.create), controller.createStolik)
  .get("/get/:stolikId", controller.readStolik)
  .get("/get", controller.readAll)
  .patch(
    "/update/:stolikId",
    ValidateJoi(Schemas.stolik.update),
    controller.updateStolik
  )
  .delete("/delete/:stolikId", controller.deleteStolik);

module.exports = stolikRoutes;
