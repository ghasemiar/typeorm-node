import {DataSource} from "typeorm";
import {Category} from "../Entities/Category";
import {Product} from "../Entities/Product";
import {User} from "../Entities/User";
import {Brand} from "../Entities/Brand";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging:true,
    entities: [Category,Product,User,Brand],
})