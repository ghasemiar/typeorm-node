import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "../Category/Entity";
import { Brand } from "../Brand/Entity";
import { User } from "../User/Entity";
export enum ProductStatus {
  PENDING = "pending",
  REJECT = "reject",
  ACCEPT = "accept",
}
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: "varchar" })
  name: string;
  @Column({ type: "varchar" })
  description: string;
  @Column({ type: "int" })
  year: number;
  @Column({ type: "int" })
  price: number;
  @Column({ type: "varchar", nullable: true })
  image: string;
  @Column({ type: "enum", enum: ProductStatus, default: ProductStatus.PENDING })
  status: ProductStatus;
  @Column({ type: "boolean", default: false })
  isPublic: boolean;
  @ManyToOne(() => Category, (category) => category.products)
  @JoinTable()
  category: Category;
  @ManyToOne(() => Brand, (brand) => brand.products)
  @JoinTable()
  brand: Brand;
  @ManyToOne(() => User, (user) => user.products)
  @JoinTable()
  user: User;
}
