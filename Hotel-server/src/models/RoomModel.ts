import mongoose, { Schema } from 'mongoose';
import { PropertyClass } from './PropertyModel';
import { UserClass } from './UserModel';

export enum enumRoomType {
    Single_Room = 'Single Room',
    Double_Room = 'Double Room',
    Triple_Room = 'Triple Room',
    King_Room = 'King Room',
    Executive_Room = 'Executive Room',
    Queen_Room = 'Queen Room',
    Juniour_Suites = 'Junior Suites'
}

export class RoomClass {
    _id: string = '';
    adminID: string = '';
    property: PropertyClass = new PropertyClass()
    roomNumber: number = 0
    type: enumRoomType = enumRoomType.Single_Room // e.g., single, double, suite
    description: string = ''
    amenities: string[] = []
    images: string[] = []
    price: number = 0
    currency: string = ''
    maxOccupancy: number = 0
    rating: number = 0
    isAvailable: boolean = true
    createdAt: Date = new Date()
    updatedAt: Date = new Date()
}

const RoomSchema = new Schema<RoomClass>({
    adminID: { type: String, required: true },
    property: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true }, // propertyID will inserted
    roomNumber: { type: Number, required: [true, 'Property room number is required'], min: 1 },
    type: { type: String, enum: Object.values(enumRoomType), required: [true, ' Room type is required'], default: enumRoomType.Single_Room }, // e.g., single, double, suite
    description: { type: String },
    amenities: [String],
    images: [String],
    price: { type: Number, required: [true, 'Room price is required'] },
    currency: { type: String, required: [true, 'Currency is required'] },
    maxOccupancy: { type: Number, required: [true, 'Room max occupancy is required'] },
    rating: { type: Number, max: 5 },
    isAvailable: { type: Boolean, default: true },
    createdAt: { type: Date },
    updatedAt: { type: Date }
});

RoomSchema.index({ adminID: 1 })

export const Room = mongoose.model<RoomClass>('Room', RoomSchema);
