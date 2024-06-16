import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { City } from "../City/Entity";
import { Profile } from "../Profile/Entity";

@Entity()
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 20 })
  name: string;

  @OneToMany(() => City, (city) => city.province)
  cities: City[];
  @OneToMany(() => Profile, (profile) => profile.province)
  profile: Profile[];
}
