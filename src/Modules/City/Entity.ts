import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Province } from "../Province/Entity";
import { Profile } from "../Profile/Entity";

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @ManyToOne(() => Province, (province) => province.cities)
  province: Province;

  @Column({ type: "double" })
  lat: number;

  @Column({ type: "double" })
  lng: number;
  @OneToMany(() => Profile, (profile) => profile.city)
  profile: Profile[];
}
