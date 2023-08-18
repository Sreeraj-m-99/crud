const express = require("express");

const app = express();

const cors = require("cors");

app.use(express.json());

const mongoose = require("mongoose");

const employeeRoutes = require("./routes/employeeRoutes");

const dotenv = require("dotenv"); 

dotenv.config({ path: "./config.env" }); 

const url = process.env.DATABASE; 

const Port = process.env.PORT;

app.use(cors());

app.use("/api/employees", employeeRoutes);

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`mongodb connected sucessfully`);
    app.listen(Port, () => {
      console.log("server is running at port", Port);
    });
  })
  .catch((error) => {
    console.error("error occured", error);
  });
