import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field({ nullable: false })
    @Column()
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column('int', { nullable: false, default: 0 })
    tokenVersion: number;
}
