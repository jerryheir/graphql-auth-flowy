import { User } from "../entity/User";
import { sign } from "jsonwebtoken";

export const createToken = ({ id, email, tokenVersion }: User, str: string, shouldRefresh: boolean) => {
    const refresh = shouldRefresh ? process.env.REFRESH_SECRET : process.env.JWT_SECRET;
    const version = shouldRefresh ? { tokenVersion } : {};
    return sign({ userId: id, email, ...version }, refresh!, {
        expiresIn: str
    })
}