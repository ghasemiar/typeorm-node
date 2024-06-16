import {
  Column,
  JoinColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "../Product/Entity";
import { Profile } from "../Profile/Entity";

export enum UserRole {
  ADMIN = "admin",
  GHOST = "ghost",
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "varchar" })
  username: string;
  @Column({ type: "varchar" })
  password: string;
  @Column({ type: "varchar" })
  email: string;
  @Column({ type: "enum", enum: UserRole, default: UserRole.GHOST })
  role: UserRole;
  @Column({ type: "varchar" })
  phone: string;
  @OneToMany(() => Product, (product) => product.user, {
    cascade: true,
  })
  products: Product[];
  @OneToOne(() => Profile, { nullable: true })
  @JoinColumn()
  profile: Profile;
}
