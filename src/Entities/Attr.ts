import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
@Entity()
export class Attr {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    type: string
}