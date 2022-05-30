import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";

const app = express();

//Connect to mongo
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Connected to mongoDB");
    StartServer();
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
  });

const StartServer = () => {
  /** Log the request */
  app.use((req, res, next) => {
    /** Log the req */
    Logging.info(
      `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      /** Log the res */
      Logging.info(
        `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
      );
    });

    next();
  });

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  /** Routes */
  const restauracjaRoutes = require("./routes/RestauracjaRoutes");
  const pracownikRoutes = require("./routes/PracownikRoutes");
  const stolikRoutes = require("./routes/StolikRoutes");
  const danieRoutes = require("./routes/DanieRoutes");
  const produktRoutes = require("./routes/ProduktRoutes");
  const rezerwacjaRoutes = require("./routes/RezerwacjaRoutes");
  const zamowienieRoutes = require("./routes/ZamowienieRoutes");

  app.use("/restauracja", restauracjaRoutes);
  app.use("/pracownik", pracownikRoutes);
  app.use("/stolik", stolikRoutes);
  app.use("/danie", danieRoutes);
  app.use("/produkt", produktRoutes);
  app.use("/rezerwacja", rezerwacjaRoutes);
  app.use("/zamowienie", zamowienieRoutes);
  // change
  /** Healthcheck */
  app.get("/", (req, res, next) => res.status(200).json({ hello: "world" }));

  /** Error handling */
  app.use((req, res, next) => {
    const error = new Error("Not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  });

  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
