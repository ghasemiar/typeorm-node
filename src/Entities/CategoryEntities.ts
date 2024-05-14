import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {IProductEntities, ProductEntities} from "./ProductEntities";

export interface ICategoryEntities{
    id: number;
    name: string;
    parent?: ICategoryEntities;
    children?: ICategoryEntities[];
    product:IProductEntities[];
}
@Entity()
export class CategoryEntities {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @ManyToOne((type) => CategoryEntities, (category) => category.children)
    parent?: CategoryEntities
    @OneToMany((type) => CategoryEntities, (category) => category.parent,{nullable:true})
    children?: CategoryEntities[]
    @OneToMany((type) => ProductEntities, (product) => product.user, {
        cascade: true,
        nullable:true
    })
    product: ProductEntities[]
}