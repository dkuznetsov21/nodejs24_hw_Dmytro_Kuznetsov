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

    async create(table: MongooseModelsMapEnum, data: object): Promise<IUser> {
        const model = this.getModel(table);
        return model.create(data)
    }

    async findAll(table: MongooseModelsMapEnum): Promise<IUser[]> {
        const model = this.getModel(table);
        return model.find().exec();
    }

    async findOneById(table: MongooseModelsMapEnum, id: number): Promise<any> {
        const model = this.getModel(table);
        //TODO If i change Promise<any> above to Promise<IUser | null> i get an error
        return model.findOne({id: id}).lean();
    }

    findOneByFirstName(table: MongooseModelsMapEnum, firstName: string): Promise<any> {
        const model = this.getModel(table);
        //TODO If i change Promise<any> above to Promise<IUser | null> i get an error
        return model.findOne({firstName: firstName}).lean();
    }

    replaceById(table: MongooseModelsMapEnum, id: number): Promise<any> {
        const model = this.getModel(table);
        //TODO If i change Promise<any> above to Promise<IUser | null> i get an error
        return model.findOneAndReplace({id: id}).lean();
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