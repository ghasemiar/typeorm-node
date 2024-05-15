import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "./Product";
@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @ManyToOne(() => Category, (category) => category.children,{nullable:true})
    parent?: Category
    @OneToMany(() => Category, (category) => category.parent,{nullable:true})
    children?: Category[]
    @OneToMany(() => Product, (product) => product.category, {
        cascade: true,
    })
    products: Product[]
}