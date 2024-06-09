import {Column, Entity, OneToMany, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent} from "typeorm";
import {Product} from "../Product/Entity";


@Tree("closure-table")
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @TreeChildren()
    children: Category[]

    @TreeParent()
    parent: Category

    @OneToMany(() => Product, (product) => product.category, {
        cascade: true,
    })
    products: Product[];
}