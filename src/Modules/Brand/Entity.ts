import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Product} from "../Product/Entity";



@Entity()
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    name: string;

    @OneToMany(() => Product, (product) => product.brand, {
        cascade: true,
    })
    products: Product[];


}