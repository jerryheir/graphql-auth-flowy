import { Task } from "../entity/Task";
import { 
    Resolver, 
    Query,
    Mutation,
    Arg,
} from "type-graphql";
import { TasksResponse } from "../types";

@Resolver()
export class TaskResolver {
    @Query(()=>String)
    hello(){
        return "Hi or Hello World"
    }

    @Query(()=>TasksResponse)
    async getTasks(
        @Arg('id') id: number,
    ) {
        try {
            const task = await Task.findOne({ where: { id }});
            const listOfTasks = await Task.find({ where: { pId: id } });
            const list = listOfTasks.map((e: Task)=>{
                return {
                    ...e,
                    list: []
                } 
            })
            if (task){
                return {
                    id: task.id,
                    pId: task.pId,
                    task: task.task,
                    list: list && list.length > 0 ? list : []
                }
            } else {
                return {
                    id: 0,
                    pId: 0,
                    task: "",
                    list: list && list.length > 0 ? list : []
                }
            }
        } catch (err) {
            console.log(err);
            return {
                id: 0,
                pId: 0,
                task: "",
                list: []
            }
        }
    }

    @Mutation(()=>Number)
    async addTask(
        @Arg('pId') pId: number,
        @Arg('task') task: string
    ): Promise<Number> {
        try {
            const res = await Task.insert({
                pId,
                task
            })
            return res.raw[0].id;
        } catch (err){
            console.log(err);
            return 0;
        }
    }

    @Mutation(()=>Boolean)
    async updateTask(
        @Arg('id') id: number,
        @Arg('task') task: string
    ): Promise<Boolean> {
        try {
            await Task.update({ id }, {
                task
            })
            return true;
        } catch (err){
            console.log(err);
            return false;
        }
    }

    @Mutation(()=>Boolean)
    async deleteTask(
        @Arg('id') id: number
    ): Promise<Boolean> {
        try {
            await Task.delete({ id })
            await Task.delete({ pId: id })
            return true;
        } catch (err){
            console.log(err);
            return false;
        }
    }
}