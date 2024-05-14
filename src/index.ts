import express from "express"
import 'reflect-metadata';
import 'es6-shim';
import{myDataSource} from "./Database/Connection"
const app = express();
myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!")
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err)
    })

app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});