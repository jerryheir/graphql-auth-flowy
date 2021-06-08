// import { Task } from "src/entity/Task";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
    @Field(()=>String)
    accessToken: string;
}

@ObjectType()
export class TasksResponse {
    @Field()
    id: number;
    @Field()
    pId: number;
    @Field()
    task: string;
    @Field(()=>[List])
    list: List[] | []
}

@ObjectType()
export class List {
    @Field()
    id?: number;
    @Field()
    pId?: number;
    @Field()
    task?: string;
    @Field(()=>[List])
    list: List[] | []
}
