import express from "express"
import 'reflect-metadata';
import 'es6-shim';
import{myDataSource} from "./Database/Connection"
import UserRoutes from "./Routes/UserRoutes";
import CategoryRoute from "./Routes/CategoryRoute";
import ProductRoute from "./Routes/ProductRoute";
import TypesenseRoute from "./Routes/TypesenseRoute";
import {initializeTypesenseCollection} from "./Typesense/Collections/ProductCollection";
import BrandRoutes from "./Routes/BrandRoutes";
const app = express();
//initialize database
myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    })
//initialize typesense
initializeTypesenseCollection()
//Routes
app.use(express.json());
app.use("/api",UserRoutes)
app.use("/api",CategoryRoute)
app.use("/api",ProductRoute)
app.use("/api",TypesenseRoute)
app.use("/api",BrandRoutes)
// app.get('/search', async (req, res) => {
//
// const t = await typesense.collections('testProduct')
//     .documents()
//     .search({q:req.query.name,query_by:"name"})
//     res.json(t)
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});