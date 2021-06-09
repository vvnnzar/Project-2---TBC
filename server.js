const express = require("express");
const path = require("path");
const routes = require("./routes");
const session = require("client-sessions");
const helpers = require("./utils/helpers");
const exphbs = require("express-handlebars");
require("dotenv").config();

const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

app.use(
    session({
        cookieName: "session",
        secret: process.env.SESSION_SECRET_KEY,
        duration: 24 * 60 * 60 * 1000,
        activeDuration: 15 * 60 * 1000,
        cookie: {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "strict",
            //TODO: ADD secure when put into procution,
            // secure:true,
        },
    })
);

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});
