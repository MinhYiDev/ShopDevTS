"use strict";
import { MongooseQueryOptions } from "mongoose";
import keyTokenModel from "~/model/keyToken.model";

interface IKeyToken {
    userId: any;
    privateKey: string;
    publicKey: string;
    refreshToken: string;
    refreshTokenUsed?: string | null;
}

class KeyTokenService {
    public static createKeyToken({ userId, privateKey, publicKey, refreshToken, refreshTokenUsed = null }: IKeyToken) {
        const filter: { user: any } = {
            user: userId,
        };

        const update: { privateKey: string; publicKey: string; refreshToken: string; refreshTokenUsed: string | null } =
            {
                privateKey,
                publicKey,
                refreshToken,
                refreshTokenUsed,
            };

        const options: { new: boolean; upsert: boolean } = {
            new: true,
            upsert: true,
        };

        return keyTokenModel.findOneAndUpdate(filter, update, options);
    }
}

export default KeyTokenService;
