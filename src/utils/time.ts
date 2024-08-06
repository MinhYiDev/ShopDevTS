import moment from "moment-timezone";

const timeMoment = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY HH:mm:ss");

const createdTime: { type: StringConstructor; default: string } = {
    type: String,
    default: timeMoment,
};

const updateTime: { type: StringConstructor; default: string } = {
    type: String,
    default: timeMoment,
};

export { createdTime, updateTime };
