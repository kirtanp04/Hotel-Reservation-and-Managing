import { Api } from "src/common/ApiCall";
import { TParam } from 'src/common/ApiCall'

export class _Login {
    email: string = "";

    password: string = "";

    static LoginUser = async (
        objLogin: _Login,
        onSuccess: (res: any) => void,
        onFail: (err: any) => void
    ) => {
        try {
            let _Param = new TParam()
            _Param.Broker = "GuestBroker"
            _Param.function = "CreateUser"
            _Param.data = objLogin
            const res = await Api.get(_Param);
            if (res.error === "") {
                onSuccess(res.data);
            } else {
                onFail(res.error);
            }
        } catch (error) {
            onFail(error);
        }
    };
}

export class _Register {
    _id?: string = "";
    name: string = "";
    email: string = "";
    password: string = "";
    profileImg: string = "";
    phone: string = "";
    role: "guest" | "admin" = "admin";
    createdAt: Date = new Date();
}
