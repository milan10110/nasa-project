const http = require("http");
require("dotenv").config();
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const MONGO_DATABASE_NAME = "nasa";
const MONGO_URL = `mongodb+srv://nasa-api:${process.env.MONGO_PASSWORD}@nasaapicluster.tvrxceh.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  //Connect to mongoDB
  await mongoose.connect(MONGO_URL);

  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();
