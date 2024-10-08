import { NextFunction, Request, Response } from 'express';
import { CacheKey, Param } from '../Constant';
import { TParam } from '../types/Type';
import { HttpStatusCodes, GetUserErrorObj, UserResponse, Cache, GetUserSuccessObj } from '../common';
import { enumRoomType, Room, RoomClass } from '../models/RoomModel';
import { checkAdminVerification } from '../middleware/AdiminVerification';
import { Property } from '../models/PropertyModel';
import { checkGuestVerification } from '../middleware/GuestVerification';

const _AddRoom = Param.function.manager.Room.AddRoom;
const _UpdateRoom = Param.function.manager.Room.UpdateRoom;
const _DeleteRoom = Param.function.manager.Room.DeleteRoom;
const _GetAllRoom = Param.function.manager.Room.GetAllRoom;


const _GuestGetRoomDetail = Param.function.guest.room.GetRoomDetail

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
        } else if (objParam.function === _GetAllRoom) {
            const _res = await _Function.getAllRooms();
            this.objUserResponse = _res;
        } else if (objParam.function === _UpdateRoom) {
            const _res = await _Function.updateRoom();
            this.objUserResponse = _res;
        } else if (objParam.function === _DeleteRoom) {
            const _res = await _Function.deleteRoom();
            this.objUserResponse = _res;
        } else if (objParam.function === _GuestGetRoomDetail) {
            const _res = await _Function.getRoomDetail();
            this.objUserResponse = _res;
        } else {
            this.objUserResponse = GetUserErrorObj('Server error: Wronge Function.', HttpStatusCodes.BAD_REQUEST);
        }

        return this.objUserResponse;
    };
}

class Functions {
    private objUserResponse: UserResponse = new UserResponse();

    public req: Request | null = null;

    public res: Response | null = null;

    public next: NextFunction | null = null;

    public objParam: TParam = new TParam();

    public addRoom = async (): Promise<UserResponse> => {
        try {
            const {
                adminID,
                amenities,
                createdAt,
                description,
                isAvailable,
                maxOccupancy,
                price,
                property,
                roomNumber,
                type,
                updatedAt,
                images,
            } = this.objParam.data as RoomClass;

            const isUser = await checkAdminVerification(adminID);

            if (isUser.error === '') {
                const ManagerRoomCache = Cache.getCacheData(CacheKey.manager.room(isUser.data.email));
                const ManagerPropertyCache = Cache.getCacheData(CacheKey.manager.property(isUser.data.email));
                const UserPropertyCache = Cache.getCacheData(CacheKey.user.property(property._id));

                const isAvailableRoom = await Room.findOne({
                    $and: [
                        {
                            type: type
                        },
                        {
                            roomNumber: roomNumber
                        },
                        {
                            property: property._id
                        }
                    ]
                })

                if (isAvailableRoom) {
                    this.objUserResponse = GetUserErrorObj(`Server error: Same room type/ Same room number/ and same property already present change any of one. `, HttpStatusCodes.NOT_ACCEPTABLE);

                } else {

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
                        images: images,
                    });

                    await newRoom.save();


                    if (newRoom) {

                        const isPropertyUpdated = await Property.findByIdAndUpdate(
                            { _id: property._id },
                            {
                                $push: {
                                    rooms: newRoom._id,
                                },
                            }
                        );

                        if (isPropertyUpdated) {
                            if (ManagerRoomCache.data !== '') {
                                Cache.ClearCache(CacheKey.manager.room(isUser.data.email));
                            }
                            if (ManagerPropertyCache.data !== '') {
                                Cache.ClearCache(CacheKey.manager.property(isUser.data.email));
                            }

                            if (UserPropertyCache.data !== '') {
                                Cache.ClearCache(CacheKey.user.property(property._id));
                            }
                            this.objUserResponse = GetUserSuccessObj(
                                `Success: New Room have been created for property `,
                                HttpStatusCodes.CREATED
                            );

                        } else {
                            this.objUserResponse = GetUserErrorObj(
                                `Server error : Unable to update your property after creating room.`,
                                HttpStatusCodes.BAD_REQUEST
                            );
                        }

                    } else {
                        this.objUserResponse = GetUserErrorObj(`Server error not able to save Room `, HttpStatusCodes.BAD_REQUEST);
                    }

                }

            } else {
                this.objUserResponse = GetUserErrorObj(isUser.error, HttpStatusCodes.NOT_ACCEPTABLE);
            }
        } catch (error: any) {
            this.objUserResponse = GetUserErrorObj(error.message, HttpStatusCodes.BAD_REQUEST);
        } finally {
            return this.objUserResponse;
        }
    };

    public getAllRooms = async (): Promise<UserResponse> => {
        try {
            const adminID = this.objParam.data;

            const isUser = await checkAdminVerification(adminID);

            if (isUser.error === '') {
                const ManagerRoomCache = Cache.getCacheData(CacheKey.manager.room(isUser.data.email));

                if (ManagerRoomCache.error === '') {
                    this.objUserResponse = GetUserSuccessObj(ManagerRoomCache.data, HttpStatusCodes.OK);
                } else {
                    const allRooms = await Room.find({ adminID: adminID }).populate('property').exec();
                    if (allRooms) {
                        Cache.SetCache(CacheKey.manager.room(isUser.data.email), allRooms);
                        this.objUserResponse = GetUserSuccessObj(allRooms, HttpStatusCodes.OK);
                    }
                }
            } else {
                this.objUserResponse = GetUserErrorObj(isUser.error, HttpStatusCodes.NOT_ACCEPTABLE);
            }
        } catch (error: any) {
            this.objUserResponse = GetUserErrorObj(error.message, HttpStatusCodes.BAD_GATEWAY);
        } finally {
            return this.objUserResponse;
        }
    };

    public updateRoom = async (): Promise<UserResponse> => {
        try {
            const { _id, adminID, amenities, description, images, isAvailable, maxOccupancy, price, roomNumber, type, updatedAt } = this.objParam.data as RoomClass
            const isUser = await checkAdminVerification(adminID);
            if (isUser.error === '') {
                const ManagerRoomCache = Cache.getCacheData(CacheKey.manager.room(isUser.data.email));
                const ManagerPropertyCache = Cache.getCacheData(CacheKey.manager.property(isUser.data.email));
                const UserRoomCache = Cache.getCacheData(CacheKey.user.room(_id));


                const isUpdated = await Room.findOneAndUpdate({ $and: [{ _id: _id }, { adminID: adminID }] }, {
                    $set: {
                        amenities: amenities,
                        description: description,
                        images: images,
                        isAvailable: isAvailable,
                        maxOccupancy: maxOccupancy,
                        price: price,
                        roomNumber: roomNumber,
                        type: type,
                        updatedAt: updatedAt
                    }
                })

                if (isUpdated) {
                    const UserPropertyCache = Cache.getCacheData(CacheKey.user.property(isUpdated.property as any));
                    if (ManagerRoomCache.data !== '') {
                        Cache.ClearCache(CacheKey.manager.room(isUser.data.email));
                    }
                    if (ManagerPropertyCache.data !== '') {
                        Cache.ClearCache(CacheKey.manager.property(isUser.data.email));
                    }
                    if (UserRoomCache.data !== '') {
                        Cache.ClearCache(CacheKey.user.room(_id));
                    }
                    if (UserPropertyCache.data !== '') {
                        Cache.ClearCache(CacheKey.user.property(isUpdated.property as any));
                    }
                    this.objUserResponse = GetUserSuccessObj(
                        `Success: Your Room has been Updated `,
                        HttpStatusCodes.CREATED
                    );

                } else {
                    this.objUserResponse = GetUserErrorObj(`Server error not able to update Room `, HttpStatusCodes.BAD_REQUEST);
                }
            } else {
                this.objUserResponse = GetUserErrorObj(isUser.error, HttpStatusCodes.NOT_ACCEPTABLE);
            }

        } catch (error: any) {
            this.objUserResponse = GetUserErrorObj(error.message, HttpStatusCodes.BAD_GATEWAY);
        } finally {
            return this.objUserResponse
        }
    }

    public deleteRoom = async (): Promise<UserResponse> => {
        try {
            const { adminID, RoomID } = this.objParam.data
            const isUser = await checkAdminVerification(adminID);
            if (isUser.error === '') {
                const ManagerRoomCache = Cache.getCacheData(CacheKey.manager.room(isUser.data.email));
                const ManagerPropertyCache = Cache.getCacheData(CacheKey.manager.property(isUser.data.email));
                const UserRoomCache = Cache.getCacheData(CacheKey.user.room(RoomID));


                const isDeleted = await Room.findOneAndDelete({ $and: [{ _id: RoomID }, { adminID: adminID }] })



                if (isDeleted) {
                    const isPropertyUpdated = await Property.findOneAndUpdate({ _id: isDeleted.property }, {
                        $pull: {
                            rooms: isDeleted._id
                        }
                    })

                    if (isPropertyUpdated) {
                        const UserPropertyCache = Cache.getCacheData(CacheKey.user.property(isDeleted.property as any));
                        if (ManagerRoomCache.data !== '') {
                            Cache.ClearCache(CacheKey.manager.room(isUser.data.email));
                        }
                        if (ManagerPropertyCache.data !== '') {
                            Cache.ClearCache(CacheKey.manager.property(isUser.data.email));
                        }
                        if (UserRoomCache.data !== '') {
                            Cache.ClearCache(CacheKey.user.room(RoomID));
                        }
                        if (UserPropertyCache.data !== '') {
                            Cache.ClearCache(CacheKey.user.property(isDeleted.property as any));
                        }
                        this.objUserResponse = GetUserSuccessObj(
                            `Success: Your Room has been deleted `,
                            HttpStatusCodes.CREATED
                        );


                    } else {
                        this.objUserResponse = GetUserErrorObj('Server error: Not able to remove Room from property after deleting. ', HttpStatusCodes.BAD_REQUEST);
                    }

                } else {
                    this.objUserResponse = GetUserErrorObj('Server error: Not able to delete Room. ', HttpStatusCodes.BAD_REQUEST);
                }




            } else {
                this.objUserResponse = GetUserErrorObj(isUser.error, HttpStatusCodes.NOT_ACCEPTABLE);
            }

        } catch (error: any) {
            this.objUserResponse = GetUserErrorObj(error.message, HttpStatusCodes.BAD_GATEWAY);
        } finally {
            return this.objUserResponse
        }
    }

    public getRoomDetail = async (): Promise<UserResponse> => {
        try {
            const { guestID, roomID, PropertyID } = this.objParam.data;

            const isUser = await checkGuestVerification(guestID);



            if (isUser.error === '') {

                const roomCache = Cache.getCacheData(CacheKey.user.room(roomID))

                if (roomCache.error === '') {
                    this.objUserResponse = GetUserSuccessObj(roomCache.data, HttpStatusCodes.OK);
                } else {
                    const RoomDetail = await Room.findOne({
                        $and: [
                            {
                                _id: roomID
                            },
                            {
                                property: PropertyID
                            }
                        ]
                    }).populate('property').exec();

                    if (RoomDetail) {
                        Cache.SetCache(CacheKey.user.room(roomID), RoomDetail);
                        this.objUserResponse = GetUserSuccessObj(RoomDetail, HttpStatusCodes.OK);
                    } else {
                        this.objUserResponse = GetUserErrorObj('The Room you are looking for is not available', HttpStatusCodes.NOT_ACCEPTABLE);
                    }
                }

            } else {
                this.objUserResponse = GetUserErrorObj(isUser.error, HttpStatusCodes.NOT_ACCEPTABLE);
            }
        } catch (error: any) {
            this.objUserResponse = GetUserErrorObj(error.message, HttpStatusCodes.BAD_GATEWAY);
        } finally {
            return this.objUserResponse;
        }
    };
}

