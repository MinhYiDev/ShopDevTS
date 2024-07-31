"use strict";
interface IArgPayLoadJWT {
    _id: any;
    email: string;
}

function payloadJWT(obj: IArgPayLoadJWT): IArgPayLoadJWT {
    const { _id, email } = obj;
    return {
        _id,
        email,
    };
}

export default payloadJWT;
