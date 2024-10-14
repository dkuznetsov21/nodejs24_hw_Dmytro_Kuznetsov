import {Injectable, Logger} from '@nestjs/common';
import {AbstractDatabaseService} from '../database-abstract.service';
import mongoose, {Mongoose, Promise} from 'mongoose';
import {UserModel} from '../models/user.model';
import {ConfigService} from '@nestjs/config';
import {MongooseModelsMapEnum} from '../types/enums/mongodb-model-map.enum';
import {IUser} from "../../users/interfaces/user.interface";

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

    async create(table: MongooseModelsMapEnum, data: IUser): Promise<IUser> {
        const model = this.getModel(table);
        return model.create(data)
    }

    async findAll(table: MongooseModelsMapEnum): Promise<IUser[]> {
        const model = this.getModel(table);
        return model.find().exec();
    }

    async findOneById(table: MongooseModelsMapEnum, id: number): Promise<IUser | null> {
        const model = this.getModel(table);
        const user = await model.findOne({ id }).lean().exec();

        return user as IUser | null;
    }

    async findOneByFirstName(table: MongooseModelsMapEnum, firstName: string): Promise<IUser | null> {
        const model = this.getModel(table);
        const user = await model.findOne({ firstName }).lean().exec();

        return user as IUser | null;
    }

    async replaceById(table: MongooseModelsMapEnum, id: number): Promise<IUser | null> {
        const model = this.getModel(table);
        const user = await model.findOneAndReplace({ id }, {}, { new: true }).lean().exec();

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