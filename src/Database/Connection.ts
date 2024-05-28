import {DataSource} from "typeorm";


export const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "test",
    synchronize: true,
    logging:true,
    entities: ["src/Modules/**/Entity.ts"],
})