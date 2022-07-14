const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const apiRouter = require("./routes/api");

const app = express();
const port = 5000;

require("./db");
//Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: true }));
// app.use(express.json());

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log("Servidor iniciado");
});
