import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User} from "./User";
import {Category} from "./Category";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "int" })
    year: number;

    @Column({ type: "decimal" })
    price: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinTable()
    category: Category;

    @ManyToOne(() => User, (user) => user.products)
    @JoinTable()
    user: User;
}