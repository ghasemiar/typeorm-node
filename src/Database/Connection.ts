import {DataSource} from "typeorm";
import {Attr} from "../Entities/Attr";
import {Category} from "../Entities/Category";
import {Product} from "../Entities/Product";
import {User} from "../Entities/User";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging:true,
    entities: [Attr,Category,Product,User],
})