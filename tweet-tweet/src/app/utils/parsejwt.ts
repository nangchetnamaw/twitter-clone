import { IJwtPayload } from '../models/user.interface';

export default class ParseJwt{
    static parseJwt(token: String = window.localStorage.getItem("Authorization")): IJwtPayload {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        return JSON.parse(window.atob(base64));
    }
}