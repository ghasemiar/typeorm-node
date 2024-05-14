import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
export interface IAttrEntities{
    name: string;
    type:string;
}
@Entity()
export class AttrEntities {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    type: string

}