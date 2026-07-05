require("dotenv").config();

const express = require("express");
const sequelize = require("./config/database");

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

sequelize.sync()
.then(() => {

    console.log("Database Connected Successfully");

    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });

})
.catch(err => console.log(err));