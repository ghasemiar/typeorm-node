import {Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {IUserEntities, UserEntities} from "./UserEntities";
import {CategoryEntities, ICategoryEntities} from "./CategoryEntities";

export interface IProductEntities{
    name: string;
    category: ICategoryEntities;
    user: IUserEntities;
    price:number;
    year:number;
    description:string;
}
@Entity()
export class ProductEntities  {
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
    @ManyToOne((type) => CategoryEntities, (category) => category.product)
    category: CategoryEntities
    @ManyToOne((type) => UserEntities, (user) => user.product)
    user: UserEntities
}