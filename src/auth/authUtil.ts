import { NextFunction } from "express";
import jwt from "jsonwebtoken";

interface ITokenJWT {
    payload: any;
    privateKey: string;
    publicKey: string;
}

abstract class AuthUtil {
    public static async hanndleRefreshToken(req: Request, res: Response, next: NextFunction) {}

    public static async createTokenPair({ payload, privateKey, publicKey }: ITokenJWT) {
        const [accessToken, refreshToken]: string[] = await Promise.all([
            jwt.sign(payload, publicKey, { expiresIn: "2d" }),
            jwt.sign(payload, publicKey, { expiresIn: "7d" }),
        ]);

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) console.log("Loi JWT NE: ", err);
            console.log(decode);
        });

        return {
            accessToken,
            refreshToken,
        };
    }
}

export default AuthUtil;
