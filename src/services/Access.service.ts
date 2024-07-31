import { FlattenMaps } from "mongoose";
import bcrypt, { genSalt } from "bcrypt";
import { ErrorResponse } from "~/core/errror.response";
import shopModel, { IShop } from "~/model/shop.model";
import CreateKey from "~/utils/randomKey";
import AuthUtil from "~/auth/authUtil";
import KeyTokenService from "./KeyToken.service";
import payloadJWT from "~/utils/PayLoadJwt";

interface IArgument {
    name?: string;
    email: string;
    password: string;
}

interface IToken<T> {
    accessToken: T;
    refreshToken: T;
}

interface IResultData<T> {
    data: IShop;
    tokens?: IToken<T>;
}

class AccessService {
    // Login
    public static async login({ email, password }: IArgument): Promise<IResultData<string>> {
        const findShop = await shopModel.findOne({ email });
        if (!findShop) throw new ErrorResponse(500, "Pls Register was Login");

        const comparePassword = await bcrypt.compare(password, findShop.password);
        if (!comparePassword) throw new ErrorResponse(500, "Password correct !!!");

        const privateKey: string = CreateKey.privateKey;
        const publicKey: string = CreateKey.publicKey;

        const tokens: IToken<string> = await AuthUtil.createTokenPair({
            payload: payloadJWT(findShop),
            privateKey,
            publicKey,
        });

        await KeyTokenService.createKeyToken({
            userId: findShop._id,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken,
        });

        return {
            data: findShop,
            tokens,
        };
    }

    // Register
    public static async register({ name, email, password }: IArgument): Promise<IResultData<string>> {
        const checkName: FlattenMaps<IShop> | null = await shopModel.findOne({ name }).lean();
        const checkEmail: FlattenMaps<IShop> | null = await shopModel.findOne({ email }).lean();

        if (checkName) throw new ErrorResponse(500, "Name Exist");
        if (checkEmail) throw new ErrorResponse(500, "Email Exist");

        // hashPassword
        const salt: string = await genSalt(10);

        const hashPassword: string = bcrypt.hashSync(password, salt);

        const newShop: IShop = await shopModel.create({ name, email, password: hashPassword });

        if (newShop) {
            const privateKey: string = CreateKey.privateKey;
            const publicKey: string = CreateKey.publicKey;

            const { _id, email } = newShop;

            const tokens: IToken<string> = await AuthUtil.createTokenPair({
                payload: { _id, email },
                privateKey,
                publicKey,
            });

            await KeyTokenService.createKeyToken({
                userId: newShop._id,
                privateKey,
                publicKey,
                refreshToken: tokens.refreshToken,
            });

            return {
                data: newShop,
                tokens: tokens,
            };
        }

        throw new ErrorResponse(500, "ERR Register");
    }
}

export default AccessService;
