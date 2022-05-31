import controller from "../controllers/ZamowienieController";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const zamowienieRoutes = require("express").Router();

zamowienieRoutes
  .post(
    "/create",
    ValidateJoi(Schemas.zamowienie.create),
    controller.createZamowienie
  )
  .get("/get/:zamowienieId", controller.readZamowienie)
  .get("/get", controller.readAll)
  .get("/filterEmployee/:EmployeeId", controller.filterEmployee)
  .get("/filterTable/:TableId", controller.filterTable)
  .patch(
    "/update/:zamowienieId",
    ValidateJoi(Schemas.zamowienie.update),
    controller.updateZamowienie
  )
  .delete("/delete/:zamowienieId", controller.deleteZamowienie);

module.exports = zamowienieRoutes;
