import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Attr {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:"varchar"})
    name: string;
    @Column({type:"varchar"})
    type: string
}