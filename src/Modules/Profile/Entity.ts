import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Province } from "../Province/Entity";
import { City } from "../City/Entity";
import { Job } from "../Job/Entity";
export enum GenderEnum {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "enum", enum: GenderEnum, default: GenderEnum.OTHER })
  sex: GenderEnum;
  @Column({ type: "date", nullable: true })
  birthday: Date;
  @UpdateDateColumn()
  lastActivity: Date;
  @Column({ type: "varchar", nullable: true })
  image: string;
  @ManyToOne(() => Province, (province) => province.profile)
  @JoinTable()
  province: Province;
  @ManyToOne(() => City, (city) => city.profile)
  @JoinTable()
  city: City;
  @ManyToOne(() => Job, (job) => job.profile)
  @JoinTable()
  job: Job;
  @Column({ type: "double" })
  lat: number;
  @Column({ type: "double" })
  lng: number;
  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;
}
