import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from "typeorm";
import { Profile } from "../Profile/Entity";

@Tree("closure-table")
@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  name: string;

  @TreeChildren()
  children: Job[];

  @TreeParent()
  parent: Job;

  @OneToMany(() => Profile, (profile) => profile.job, {
    cascade: true,
  })
  profile: Profile[];
}
