import { Api, getGETParamData, getPostParamData } from "src/common/ApiCall";
import { RoomClass } from "../room/DataObject";
import { Param } from "src/Constant";
import { ProjectResponse } from "src/common/Response";
import { StoreError } from "src/util/StoreError";
import { isUndefinedOrNull } from "src/common/common";

export enum enumPropertyType {
    Hotel = 'Hotel',
    Resort = 'Resort',
    Apartment = 'Apartment',
    Bungalow = 'Bungalow',
    Villa = 'Villa',
    Cottage = 'Cottage'
}

export class PropertyClass {


    // reviews: ReviewClass = new ReviewClass();
    // subscribers: SubscriberClass = new SubscriberClass();





    _id: string = '';
    adminID: string = '';
    name: string = '';
    propertyType: enumPropertyType = enumPropertyType.Hotel;
    address: string = '';
    city: string = '';
    state: string = '';
    country: string = '';
    zipCode: string = '';
    phone: string = '';
    email: string = '';
    website: string = '';
    description: string = '';
    amenities: string[] = [];
    images: string[] = [];
    rooms: RoomClass[] = [];
    // reviews: ReviewClass = new ReviewClass();
    // subscribers: SubscriberClass = new SubscriberClass();
    jobHiring: boolean = false
    checkInTime: string = '';
    checkOutTime: string = ''
    createdAt: Date = new Date();
    updatedAt: Date = new Date();

    static getCopy(ObjProperty: any): PropertyClass {
        let _newObjProperty: any = new PropertyClass();
        try {
            for (const key in _newObjProperty) {
                _newObjProperty[key] = isUndefinedOrNull(ObjProperty[key], _newObjProperty[key]);
            }
        } catch (error) {
            _newObjProperty = new PropertyClass();
        } finally {
            return _newObjProperty;
        }
    }
}

export class PropertyApi {
    static addNewProperty = async (
        objProperty: PropertyClass,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void
    ) => {
        try {
            const _Param = getPostParamData(
                Param.broker.manager.Property,
                Param.function.manager.Property.AddProperty
            );
            await Api.protectedPost(_Param, objProperty, (res: ProjectResponse) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    StoreError("Adding Property", res.error);
                    onFail(res.error);
                }
            });
        } catch (error: any) {
            StoreError("Adding Property", error.message);
            onFail(error.message);
        }
    };

    static getAllProperty = async (
        adminID: string,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void,
        onProgress?: (progressValue: number) => void
    ) => {
        try {
            const _Param = getGETParamData(
                Param.broker.manager.Property,
                Param.function.manager.Property.GetAllProperty,
                adminID
            );

            await Api.protectedGet(
                _Param,
                (res) => {
                    if (res.error === "") {
                        onsuccess(res.data);
                    } else {
                        StoreError("Getting All Property", res.error);
                        onFail(res.error);
                    }
                },
                (progressValue) => {
                    if (onProgress !== undefined) {
                        onProgress(progressValue);
                    }
                }
            );
        } catch (error: any) {
            StoreError("Getting All Property", error.message);
            onFail(error.message);
        }
    };

    static updateProperty = async (
        objProperty: PropertyClass,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void
    ) => {
        try {
            const _Param = getPostParamData(
                Param.broker.manager.Property,
                Param.function.manager.Property.UpdateProperty
            );
            await Api.protectedPost(_Param, objProperty, (res: ProjectResponse) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    StoreError("Adding Property", res.error);
                    onFail(res.error);
                }
            });
        } catch (error: any) {
            StoreError("Adding Property", error.message);
            onFail(error.message);
        }
    };

    static deleteProperty = async (
        adminID: string,
        PropertyID: string,
        onsuccess: (res: any) => void,
        onfail: (err: any) => void
    ) => {
        const _Param = getGETParamData(
            Param.broker.manager.Property,
            Param.function.manager.Property.DeleteProperty,
            { adminID: adminID, PropertyID: PropertyID }
        );
        try {
            await Api.protectedGet(_Param, (res) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    StoreError("Deleting Property", res.error);
                    onfail(res.error);
                }
            });
        } catch (error: any) {
            StoreError("Deleting Property", error.message);
            onfail(error.message);
        }
    };

    static getSingleProperty = async (
        adminID: string,
        propertyID: string,
        onsuccess: (res: any) => void,
        onFail: (err: any) => void
    ) => {
        try {
            const _Param = getGETParamData(
                Param.broker.manager.Property,
                Param.function.manager.Property.GetSingleProperty,
                { adminID: adminID, propertyID: propertyID }
            );

            await Api.protectedGet(_Param, (res) => {
                if (res.error === "") {
                    onsuccess(res.data);
                } else {
                    StoreError("Getting Single Property", res.error);
                    onFail(res.error);
                }
            });
        } catch (error: any) {
            StoreError("Getting Single Property", error.message);
            onFail(error.message);
        }
    };
}
