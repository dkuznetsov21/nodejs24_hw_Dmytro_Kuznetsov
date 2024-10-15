import mongoose from 'mongoose';
import {MongooseModelsMapEnum} from "../types/enums/mongodb-model-map.enum";

export const UserSchema = new mongoose.Schema({
    id: {type: Number, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    age: {type: Number, required: true},
    isStudent: {type: Boolean, required: true},
    accessToken: {type: Number, required: false},
    refreshToken: {type: Number, required: false},
});

export const UserModel = mongoose.model(MongooseModelsMapEnum.USER, UserSchema);