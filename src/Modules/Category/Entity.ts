import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../Product/Entity";



@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @ManyToOne(() => Category, (category) => category.children, { nullable: true })
    parent?: Category;

    @OneToMany(() => Category, (category) => category.parent, { nullable: true })
    children?: Category[];

    @OneToMany(() => Product, (product) => product.category, {
        cascade: true,
    })
    products: Product[];
}