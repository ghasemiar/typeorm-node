import {DataSource} from "typeorm";
import {Attr} from "../Entities/Attr";

export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging:true,
    entities: [Attr],
})