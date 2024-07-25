import express, { NextFunction, Request, Response, Router } from 'express';
import { Crypt } from '../common/Crypt';
import { SendResponseToUser } from '../middleware/UserResponse';
import { TParam } from '../types/Type';
import * as Functions from '../functions'
import { Param } from '../Constant';
import { MongoDB } from '../DB/MongoDB';
import { GetUserErrorObj, HttpStatusCodes } from '../common';


const GuestBrokerRouter: Router = express.Router();

const _GuestAuthBroker: string = Param.broker.guest.Auth;
const _GuestPropertyBroker: string = Param.broker.guest.Property;
const _GuestRoomBroker: string = Param.broker.guest.Room;

GuestBrokerRouter.get('/:param', (req: Request, res: Response, next: NextFunction) => {
    const { param } = req.params;

    console.log(param)


    const objDecrypt = Crypt.Decryption(param);

    console.log(objDecrypt)
    // const paramObj = objDecrypt.data as TParam;

    // if (paramObj.Broker === _GuestBroker) {
    //     const _UserFunction = new Functions.UserFunction(paramObj, req, res, next);
    //     return SendResponseToUser(_UserFunction.objUserResponse, next);
    // }

    // if (paramObj.Broker === _GuestHotelBroker) {
    //     const _HotelFunction = new Functions.HotelFunction(paramObj, req, res, next)
    //     return SendResponseToUser(_HotelFunction.objUserResponse, next)
    // }
});

GuestBrokerRouter.post('/:param', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isDBConnected = await MongoDB.ConnectDB(next)
        if (isDBConnected.isError === false) {
            const { param } = req.params;
            const objDecrypt = Crypt.Decryption(param);

            if (objDecrypt.error === '') {
                const decryptResBody = Crypt.Decryption(req.body.data);

                if (decryptResBody.error === '') {
                    let paramObj: TParam = objDecrypt.data;

                    paramObj.data = decryptResBody.data;

                    if (paramObj.Broker === _GuestAuthBroker) {
                        const _res = await Functions.UserFunction.findFunction(paramObj, req, res, next);
                        return SendResponseToUser(_res, next);
                    }



                    const errMess = GetUserErrorObj('Server error: Wrong Broker', HttpStatusCodes.BAD_REQUEST);
                    return SendResponseToUser(errMess, next);

                } else {
                    const errMess = GetUserErrorObj('Server error: Not able to decrypt body', HttpStatusCodes.BAD_REQUEST);
                    return SendResponseToUser(errMess, next);
                }
            } else {
                return SendResponseToUser(GetUserErrorObj(`Server Error: ${objDecrypt.error} + Params`, 404), next);
            }
        }

    } catch (error: any) {
        return SendResponseToUser(GetUserErrorObj(`Server Error: ${error.message}`, 404), next);
    }
});



export default GuestBrokerRouter;
