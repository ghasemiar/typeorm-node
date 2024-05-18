import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import {Category} from "./Category";
@Entity()
export class Attr {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:"varchar"})
    name: string;
    @Column({type:"varchar"})
    type: string
    @ManyToOne(() => Category, (category) => category.attr, )
    category: Category;
}