import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
export type UserRoleType = "admin" | "ghost"

@Entity()
export class User {
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
    @OneToMany((type) => Product, (product) => product.category, {
        cascade: true,
    })
    product: Product[]
}