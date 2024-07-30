import crypto from "crypto";

abstract class CreateKey {
    public static privateKey: string = crypto.randomBytes(64).toString("hex");
    public static publicKey: string = crypto.randomBytes(64).toString("hex");
}

export default CreateKey;
