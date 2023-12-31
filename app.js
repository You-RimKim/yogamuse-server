
require("dotenv").config();


require("./db");


const express = require("express");

const { isAuthenticated } = require("./middleware/jwt.middleware");

const app = express();
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);
 
const categoryRouter = require("./routes/category.routes");  
app.use("/api", isAuthenticated, categoryRouter);

const poseRouter = require("./routes/pose.routes"); 
app.use("/api", isAuthenticated, poseRouter);     

const favoriteRouter = require("./routes/favorite.routes"); 
app.use("/api", isAuthenticated, favoriteRouter);     

const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);    

const usersRouter = require("./routes/users.routes");
app.use("/api", usersRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
