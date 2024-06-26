import { NextFunction, Request, Response } from "express";
import { CacheKey, Param } from "../Constant";
import { TParam } from "../types/Type";
import { HttpStatusCodes, GetUserErrorObj, UserResponse, Cache, GetUserSuccessObj } from "../common";
import { Room, RoomClass } from "../models/RoomModel";
import { checkAdminVerification } from "../middleware/AdiminVerification";
import { Property } from "../models/PropertyModel";


const _AddRoom = Param.function.manager.Room.AddRoom
const _UpdateRoom = Param.function.manager.Room.UpdateRoom
const _DeleteRoom = Param.function.manager.Room.DeleteRoom

export class RoomFunction {
    private static objUserResponse: UserResponse = new UserResponse();

    static findFunction = async (objParam: TParam, req: Request, res: Response, next: NextFunction): Promise<UserResponse> => {
        let _Function = new Functions();
        _Function.req = req;
        _Function.res = res;
        _Function.next = next;
        _Function.objParam = objParam;

        if (objParam.function === _AddRoom) {
            const _res = await _Function.addRoom();
            this.objUserResponse = _res;
        } else {
            this.objUserResponse = GetUserErrorObj('Server error: Wronge Function.', HttpStatusCodes.BAD_REQUEST);
        }


        return this.objUserResponse;

    }

}


class Functions {
    private objUserResponse: UserResponse = new UserResponse();

    public req: Request | null = null;

    public res: Response | null = null;

    public next: NextFunction | null = null;

    public objParam: TParam = new TParam();

    public addRoom = async (): Promise<UserResponse> => {
        try {

            const { adminID, amenities, createdAt, description, isAvailable, maxOccupancy, price, property, roomNumber, type, updatedAt, images } = this.objParam.data as RoomClass

            const isUser = await checkAdminVerification(adminID)

            if (isUser.error === '') {

                const ManagerRoomCache = Cache.getCacheData(CacheKey.manager.room(isUser.data.email));
                const ManagerPropertyCache = Cache.getCacheData(CacheKey.manager.property(isUser.data.email));
                const UserRoomCache = Cache.getCacheData(CacheKey.user.room);

                const newRoom = await Room.create({
                    adminID: adminID,
                    amenities: amenities,
                    createdAt: createdAt,
                    description: description,
                    isAvailable: isAvailable,
                    maxOccupancy: maxOccupancy,
                    price: price,
                    property: property._id,
                    roomNumber: roomNumber,
                    type: type,
                    updatedAt: updatedAt,
                    images: images
                })

                await newRoom.save()

                if (newRoom) {

                    const isRoom = await Property.findOne({ rooms: newRoom._id })
                    if (isRoom === null || isRoom === undefined) {
                        const isPropertyUpdated = await Property.findByIdAndUpdate({ _id: property._id }, {
                            $push: {
                                rooms: newRoom._id
                            }
                        })

                        if (isPropertyUpdated) {
                            this.objUserResponse = GetUserSuccessObj(
                                `Success: New Room have been created for property ` + isPropertyUpdated.name,
                                HttpStatusCodes.CREATED
                            );
                            if (ManagerRoomCache.data !== '') {
                                Cache.ClearCache(CacheKey.manager.room(isUser.data.email));
                            }
                            if (ManagerPropertyCache.data !== '') {
                                Cache.ClearCache(CacheKey.manager.property(isUser.data.email));
                            }
                            if (UserRoomCache.data !== '') {
                                Cache.ClearCache(CacheKey.user.property);
                            }

                        } else {
                            this.objUserResponse = GetUserErrorObj(
                                `Server error : Unable to update your property after creating room.`,
                                HttpStatusCodes.BAD_REQUEST
                            );
                        }

                    } else {
                        this.objUserResponse = GetUserErrorObj(
                            `Server error : Create new room. This room is alreaded being created.`,
                            HttpStatusCodes.BAD_REQUEST
                        );
                    }



                } else {
                    this.objUserResponse = GetUserErrorObj(
                        `Server error not able to save Room `,
                        HttpStatusCodes.BAD_REQUEST
                    );
                }
                //delete room cach fro property adding

            } else {
                this.objUserResponse = GetUserErrorObj(isUser.error, HttpStatusCodes.NOT_ACCEPTABLE);
            }



        } catch (error: any) {
            this.objUserResponse = GetUserErrorObj(error.message, HttpStatusCodes.BAD_REQUEST);
        } finally {
            return this.objUserResponse
        }
    }


}