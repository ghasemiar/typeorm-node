import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ProductEntities} from "./ProductEntities";
export type UserRoleType = "admin" | "ghost"

export interface IUserEntities{
    id:string;
    name: string;
    username: string;
    password: string;
    email:string
    rule: string;
}
@Entity()
export class UserEntities {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    password: string;
    @Column()
    email:string
    @Column({
        type: "enum",
        enum: ["admin", "ghost"],
        default: "ghost"
    })
    rule: UserRoleType;
    @OneToMany((type) => ProductEntities, (product) => product.category, {
        cascade: true,
    })
    product: ProductEntities[]
}