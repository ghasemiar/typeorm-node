import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
export type UserRoleType = "admin" | "ghost"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({
        type: "enum",
        enum: ["admin", "ghost"],
        default: "ghost"
    })
    rule: UserRoleType;

    @OneToMany(() => Product, (product) => product.user, {
        cascade: true,
    })
    products: Product[];
}