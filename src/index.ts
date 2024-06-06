import express from "express";
import "reflect-metadata";
import "es6-shim";
import { myDataSource } from "./Database/Connection";
import UserRoutes from "./Modules/User/Routes";
import CategoryRoute from "./Modules/Category/Routes";
import ProductRoute from "./Modules/Product/Routes";
import TypesenseRoute from "./Modules/Typesense/Routes";
import BrandRoutes from "./Modules/Brand/Routes";
// import { initializeTypesenseCollection } from "./Typesense/Collections/ProductCollection";
import cors from "cors";
import 'dotenv/config'
import path from "path";
import {createAdmin} from "./Modules/User/AdminSeeder";
console.log(process.env.TYPESENSE_IP + " " + process.env.TYPESENSE_PORT + " " + process.env.TYPESENSE_PROTOCOL + " " + process.env.TYPESENSE_APIKEY)
const app = express();

app.use(cors({ credentials: true, origin: true }));
//initialize database
myDataSource
  .initialize()
  .then(async () => {
      await createAdmin()
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
//initialize typesense

// initializeTypesenseCollection().then(response => console.log(response)).catch(err=> console.log(err));
//Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/storage', express.static(path.join(__dirname, 'storage')));
app.use("/api", UserRoutes);
app.use("/api", CategoryRoute);
app.use("/api", ProductRoute);
app.use("/api", TypesenseRoute);
app.use("/api", BrandRoutes);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
