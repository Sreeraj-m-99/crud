const express = require("express");

const app = express();

const cors = require("cors");

app.use(express.json());

const mongoose = require("mongoose");

const employeeRoutes = require("./routes/employeeRoutes");

const url = "mongodb://0.0.0.0:27017/Employee";

PORT = 3700;

app.use(cors());

app.use("/api/employees", employeeRoutes);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`mongodb connected sucessfully`);
    app.listen(PORT, () => {
      console.log("server is running at port", PORT);
    });
  })
  .catch((error) => {
    console.error("error occured", error);
  });
