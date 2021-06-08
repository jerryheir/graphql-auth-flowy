import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../entity/User";
import { createToken } from "../services";

export const homeRoute = (_req: Request, res: Response)=>{
    return res.send("Hello, use /graphql to checkout our graphiql");
}

export const refreshTokenRoute = async (_req: Request, res: Response)=>{
    const { token } = _req.cookies;
    if (!token) {
        return res.send({ ok: false, accessToken: '' });
    }
    try {
        const payload: any = verify(token, process.env.REFRESH_SECRET!);
        const user = await User.findOne({ where: { id: payload.userId }});
        if (!user) {
            return res.send({ ok: false, accessToken: '' });
        }
        if (user.tokenVersion !== payload.tokenVersion){
            return res.send({ ok: false, accessToken: '' });
        }
        const refreshToken = createToken(user, "7d", true);
        res.cookie("token", refreshToken, { httpOnly: true });
        return res.send({ ok: true, accessToken: createToken(user, "60m", false) })
    } catch (err){
        console.log(err);
        return res.send({ ok: false, accessToken: '' });
    }
}