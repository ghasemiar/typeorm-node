import express from "express";
import "reflect-metadata";
import "es6-shim";
import { myDataSource } from "./Database/Connection";
import UserRoutes from "./Modules/User/Routes";
import CategoryRoute from "./Modules/Category/Routes";
import ProductRoute from "./Modules/Product/Routes";
import TypesenseRoute from "./Modules/Typesense/Routes";
import BrandRoutes from "./Modules/Brand/Routes";
import JobRoutes from "./Modules/Job/Routes";
import CountryRoutes from "./Modules/Country/Routes";
import ProfileRoutes from "./Modules/Profile/Routes";
import ProvinceRoutes from "./Modules/Province/Routes";
import CityRoutes from "./Modules/City/Routes";
import { initializeTypesenseCollection } from "./Typesense/Collections/ProductCollection";
import cors from "cors";
import "dotenv/config";
import path from "path";
import { createAdmin } from "./Modules/User/AdminSeeder";
import seedDatabase from "./Helper/TempData";
import syncDatabaseWithTypesense from "./Helper/SyncDatabaseWithTypesense";

const app = express();
app.use(cors({ credentials: true, origin: true }));
//initialize database
myDataSource
  .initialize()
  .then(async () => {
    await createAdmin();
    // await seedDatabase();
    // await syncDatabaseWithTypesense()
    //   .then((response) => console.log(response))
    //   .catch((err) => console.log(err));
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

//Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/storage", express.static(path.join(__dirname, "storage")));
app.use("/api", UserRoutes);
app.use("/api", CategoryRoute);
app.use("/api", ProductRoute);
app.use("/api", TypesenseRoute);
app.use("/api", BrandRoutes);
app.use("/api", JobRoutes);
app.use("/api", CountryRoutes);
app.use("/api", ProvinceRoutes);
app.use("/api", CityRoutes);
app.use("/api", ProfileRoutes);

// save tempdata in db

//initialize typesense

initializeTypesenseCollection()
  .then((response) => {
    console.log(response);
  })
  .catch((err) => console.log(err));

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
