require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const connection = require("./db");

//adminBro
const AdminBro = require("admin-bro");
const AdminBroMongoose = require("@admin-bro/mongoose");
const AdminBroExpress = require("@admin-bro/express");
const Car = require("./models/cars");
const Brand = require("./models/brands");

AdminBro.registerAdapter(AdminBroMongoose);

const adminBroOptions = {
  resources: [Brand, Car],
};

const adminBro = new AdminBro(adminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);
//
const brandsRouter = require("./routes/brands");
const productsRouter = require("./routes/products");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(adminBro.options.rootPath, router); //adminBro
app.use("/api/brands", brandsRouter);
app.use("/api/products", productsRouter);

app.listen(8080, () => console.log("AdminBro is under localhost:8080/admin")); //adminBro
module.exports = app;
