import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { User} from "./User";
import {Category} from "./Category";

@Entity()
export class Product  {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    year: number
    @Column()
    price: number
    @ManyToOne(() => Category, (category) => category.products)
    category: Category
    @ManyToOne(() => User, (user) => user.product)
    user: User
}