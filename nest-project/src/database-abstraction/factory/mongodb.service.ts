import {Injectable, Logger} from '@nestjs/common';
import {AbstractDatabaseService} from '../database-abstract.service';
import mongoose, {Mongoose, Promise} from 'mongoose';
import {UserModel} from '../models/user.model';
import {ConfigService} from '@nestjs/config';
import {MongooseModelsMapEnum} from '../types/enums/mongodb-model-map.enum';
import {IUser} from "../../users/interfaces/user.interface";
import {IReplaceUser} from "../../users/interfaces/replace-user.interface";
import {IUpdateUser} from "../../users/interfaces/update-user.interface";
import {ICreateUser} from "../../users/interfaces/create-user.interface";
import {ICreateUserResponse} from "../../users/interfaces/create-user-response.interface";
import {IReplaceUserResponse} from "../../users/interfaces/replace-user-response.interface";
import {IUpdateUserResponse} from "../../users/interfaces/update-user-response.interface";

@Injectable()
export class MongoDatabaseService extends AbstractDatabaseService {
    private readonly logger = new Logger(MongoDatabaseService.name);

    private client: Mongoose;
    private mongoUri: string;

    constructor(configService: ConfigService) {
        super();

        this.mongoUri = configService.get<string>('MONGO_URL');
    }

    async connect(): Promise<void> {
        this.client = await mongoose.connect(this.mongoUri);
        this.logger.log('Connected to MongoDB');
    }

    async disconnect(): Promise<void> {
        await this.client.connection.close();
        this.logger.log('Disconnected from MongoDB');
    }

    async create(table: MongooseModelsMapEnum, data: ICreateUser): Promise<ICreateUserResponse> {
        const model = this.getModel(table);

        const lastUser = await model.findOne().sort({ id: -1 }).exec();
        let newId = 1;

        if (lastUser) {
            newId = lastUser.id + 1;
        }

        const newUser = { ...data, id: newId };
        return model.create(newUser);
    }

    async findAll(table: MongooseModelsMapEnum): Promise<IUser[] | null> {
        const model = this.getModel(table);
        const result = await model.find().lean().exec();
        return result as IUser[];
    }

    async findByIdAndReplace(table: MongooseModelsMapEnum, id: number, data: IReplaceUser): Promise<IReplaceUserResponse | null> {
        const model = this.getModel(table);
        const result = await model.findOneAndReplace({id}, {...data, id}, {new: true}).lean().exec();
        return result as IReplaceUserResponse | null;
    }

    async findByIdAndUpdate(table: MongooseModelsMapEnum, id: number, data: IUpdateUser): Promise<IUpdateUserResponse | null> {
        const model = this.getModel(table);
        const result = await model.findOneAndUpdate({id}, {$set: data}, {new: true}).lean().exec();
        return result as IUpdateUserResponse | null;
    }

    async findOneById(table: MongooseModelsMapEnum, id: number): Promise<IUser | null> {
        const model = this.getModel(table);
        const user = await model.findOne({id}).lean().exec();

        return user as IUser | null;
    }

    async findOneByFirstName(table: MongooseModelsMapEnum, firstName: string): Promise<IUser | null> {
        const model = this.getModel(table);
        const user = await model.findOne({firstName}).lean().exec();

        return user as IUser | null;
    }

    async findByIdAndDelete(table: MongooseModelsMapEnum, id: number): Promise<IUser | null> {
        const model = this.getModel(table);
        const user = await model.findOneAndDelete({id}).lean().exec();

        return user as IUser | null;
    }

    private getModel(table: MongooseModelsMapEnum): mongoose.Model<any> {
        switch (table) {
            case MongooseModelsMapEnum.USER:
                return UserModel;

            default:
                break;
        }
    }
}