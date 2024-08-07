import { Param } from "src/Constant";
import { Api, getGETParamData, getPostParamData } from "src/common/ApiCall";

export enum enumUserRole {
    guest = 'guest',

    admin = 'admin'
}

export class _Login {
    email: string = "";

    password: string = "";
}

export class _Register {
    _id?: string = "";
    name: string = "";
    email: string = "";
    password: string = "";
    isEmailVerified: boolean = false;
    confirmPassword: string = "";
    country: string = '';
    profileImg: string = "";
    phone: string = "";
    role: enumUserRole = enumUserRole.guest;
    createdAt: Date = new Date();
}

export class Auth {

    public static Register = async (
        objRegister: _Register,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void
    ) => {
        try {
            const _Param = getPostParamData(Param.broker.manager.Auth, Param.function.manager.register);

            await Api.post(_Param, objRegister, (res) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    onFail(res.error);
                }
            });

        } catch (error: any) {
            onFail(error);
        }
    };

    public static Login = async (
        objLogin: _Login,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void
    ) => {
        try {
            const _Param = getPostParamData(Param.broker.manager.Auth, Param.function.manager.login);
            await Api.post(_Param, objLogin, (res) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    onFail(res.error);
                }
            });

        } catch (error: any) {
            onFail(error);
        }
    };

    public static EmailVerification = async (token: string,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void) => {
        const _Param = getGETParamData(Param.broker.manager.Auth, Param.function.manager.EmailVerification, { token: token });

        try {
            await Api.get(_Param, (res) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    onFail(res.error);
                }
            })
        } catch (error: any) {

            onFail(error.message);

        }

    }
}
