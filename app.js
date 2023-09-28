
require("dotenv").config();


require("./db");


const express = require("express");

const app = express();

require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
 
const categoryRouter = require("./routes/category.routes");  
app.use("/api", categoryRouter);

const poseRouter = require("./routes/pose.routes"); 
app.use("/api", poseRouter);                        

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
