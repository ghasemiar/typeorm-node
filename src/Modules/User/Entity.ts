import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import {Product} from "../Product/Entity";

export enum UserRole {
    ADMIN = "admin",
    GHOST = "ghost",
}   
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    username: string;

    @Column({ type: "varchar" })
    password: string;

    @Column({ type: "varchar" })
    email: string;

    @Column({ type: "enum", enum: UserRole, default: UserRole.GHOST })
    role: UserRole;

    @OneToMany(() => Product, (product) => product.user, {
        cascade: true,
    })
    products: Product[];
}
