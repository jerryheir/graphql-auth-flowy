import { User } from "../entity/User";
import { 
    Resolver, 
    Query, 
    Mutation, 
    Arg, 
    Ctx, 
    UseMiddleware,
    Int,
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { LoginResponse } from "../types";
import { MyContext } from "../types/interface";
import { createToken } from "../services";
import { isAuthUser } from "../middlewares";
import { getConnection } from "typeorm";

@Resolver()
export class UserResolver {
    @Query(()=>String)
    hello(){
        return "Hi or Hello World"
    }

    @Query(()=>User)
    @UseMiddleware(isAuthUser)
    async getUser(
        @Arg('id') id: number,
        // @Ctx() { payload }: MyContext
    ){
        try {
            const user = await User.findOne({ where: { id }});
            if (!user) {
                throw new Error('User not found.');
            }
            /*return {
                message: `my userId is ${payload?.userId}`,
                data: user[0]
            };*/
            return user
        } catch (err){
            console.log(err)
            return false;
        }
    }

    @Query(()=>[User])
    async users(){
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (err){
            console.log(err)
            return false;
        }
    }

    @Mutation(()=>Boolean)
    async revokeRefreshTokenForUser (
        @Arg('userId', ()=>Int) userId: number,
    ) {
        try {
            await getConnection()
            .getRepository(User)
            .increment({ id: userId }, "tokenVersion", 1);

            return true;
        } catch (err){
            console.log(err)
            return false;
        }
    }

    @Mutation(()=>LoginResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() ctx: MyContext
    ): Promise<LoginResponse> {
        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                throw new Error('Username does not exist.');
            }
            const valid = await compare(password, user.password);
            if (!valid){
                throw new Error('Unsuccessful Validation. Please try again.');
            }
            const accessToken = createToken(user, "60m", false);
            const refreshToken = createToken(user, "7d", true);
            ctx.res.cookie(
                "token",
                refreshToken,
                {
                    httpOnly: true
                }
            );
            return {
                accessToken
            }
        } catch (err){
            console.log(err)
            return { accessToken: "" };
        }
    }

    @Mutation(()=>Boolean)
    async register(
        @Arg('email') email: string,
        @Arg('password') password: string
    ){
        try {
            const user = await User.findOne({ where: { email } });
            if (user) {
                throw new Error('Username already exist.');
            }
            const hashedPassword = await hash(password, 13);
            await User.insert({
                email,
                password: hashedPassword
            })
            return true;
        } catch (err){
            console.log(err);
            return false;
        }
    }
}