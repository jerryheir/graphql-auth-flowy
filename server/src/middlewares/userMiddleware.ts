import { MyContext } from "src/types/interface";
import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";

export const isAuthUser: MiddlewareFn<MyContext> = async ({ context }, next) => {
    const authorization = context.req.headers['authorization'];
    try {
        if (!authorization) {
            throw new Error("Not Authenticated!")
        }
        const token = authorization.split(' ')[1];
        const payload = verify(token, process.env.JWT_SECRET!);
        context.payload = payload as any;
        return next();
    } catch (err){
        console.log(err)
        throw new Error("Not Authenticated!")
    }
}