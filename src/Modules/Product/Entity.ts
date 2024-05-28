import {Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Category} from "../Category/Entity";
import {Brand} from "../Brand/Entity";
import {User} from "../User/Entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @Column({ type: "varchar" })
    description: string;

    @Column({ type: "varchar" })
    content: string;

    @Column({ type: "int" })
    year: number;

    @Column({ type: "decimal" })
    price: number;

    @Column({ type: "varchar" , nullable:true })
    image: string;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinTable()
    category: Category;

    @ManyToOne(() => Brand, (brand) => brand.products)
    @JoinTable()
    brand: Brand;

    @ManyToOne(() => User, (user) => user.products)
    @JoinTable()
    user: User;
}