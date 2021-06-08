import { Field, Int, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@ObjectType()
@Entity('tasks')
export class Task extends BaseEntity {
    @Field(()=>Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { nullable: false, default: 0 })
    pId: number;

    @Field({ nullable: false, defaultValue: "Untitled" })
    @Column()
    task: string;
}