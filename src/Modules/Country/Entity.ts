import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Province } from "../Province/Entity";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @OneToMany(() => Province, (province) => province.country, {
    cascade: true,
  })
  province: Province[];
}
