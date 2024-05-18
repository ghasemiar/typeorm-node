import express from "express"
import 'reflect-metadata';
import 'es6-shim';
import{myDataSource} from "./Database/Connection"
import UserRoutes from "./Routes/UserRoutes";
import CategoryRoute from "./Routes/CategoryRoute";
import ProductRoute from "./Routes/ProductRoute";
import Typesense from 'typesense';
const app = express();
myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    })


export const typesense = new Typesense.Client({
    nodes: [
        {
            host: '172.19.50.129',
            port: 8108,
            protocol: 'http'
        }
    ],
    apiKey: 'c8SVn4zjYml40ppXh7y5XZarWMTiSyDjF8qH0zilZXhdwffB',
    connectionTimeoutSeconds: 10
});
typesense.collections().create({
    name: 'testProduct',
    fields: [
        { name: 'name', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'year', type: 'int32' },
        { name: 'price', type: 'int32' },
        { name: 'category', type: 'int32' },
    ],

}).catch(err => console.log('Collection already exists',err));
app.use(express.json());
app.use("/api",UserRoutes)
app.use("/api",CategoryRoute)
app.use("/api",ProductRoute)

app.get('/search', async (req, res) => {


   const t = await typesense.collections('testProduct')
        .documents()
        .search({q:req.query.name,query_by:"name"})
    res.json(t)
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});