import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    NotFoundException,
    UnprocessableEntityException
} from '@nestjs/common';
import {UpdateUserDto} from './dto/update-user.dto';
import {IUser} from "./interfaces/user.interface";
import {ReplaceUserDto} from "./dto/replace-user.dto";
import {IUpdateUser} from "./interfaces/update-user.interface";
import {IAbstractDatabaseService} from "../database-abstraction/types/database-abstract-service.interface";
import {MongooseModelsMapEnum} from "../database-abstraction/types/enums/mongodb-model-map.enum";
import {ICreateUser} from "./interfaces/create-user.interface";
import {IReplaceUser} from "./interfaces/replace-user.interface";
import {ICreateUserResponse} from "./interfaces/create-user-response.interface";
import {IReplaceUserResponse} from "./interfaces/replace-user-response.interface";
import {IUpdateUserResponse} from "./interfaces/update-user-response.interface";

@Injectable()
export class UsersService {
    constructor(
        @Inject('DATABASE_CONNECTION') private dbService: IAbstractDatabaseService,
    ) {
    }

    async create(createUser: ICreateUser): Promise<ICreateUserResponse> {
        return this.dbService.create(MongooseModelsMapEnum.USER, createUser);
    }

    async findAll(): Promise<IUser[]> {
        return this.dbService.findAll(MongooseModelsMapEnum.USER);
    }

    async findOneById(id: number): Promise<IUser> {
        const user = await this.dbService.findOneById(MongooseModelsMapEnum.USER, id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async findOneByFirstName(firstName: string): Promise<IUser> {
        const user = await this.dbService.findOneByFirstName(MongooseModelsMapEnum.USER, firstName);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    findOneWithoutException(firstName: string): Promise<IUser> {
        return this.dbService.findOneByFirstName(MongooseModelsMapEnum.USER, firstName);
    }

    async findOneAndUpdate(id: number, updateBody: IUpdateUser): Promise<IUpdateUserResponse> {
        const user = await this.findOneById(id);
        return this.update(user.id, updateBody);
    }

    async replace(id: number, replaceUser: IReplaceUser): Promise<IReplaceUserResponse> {
        const user = await this.dbService.findByIdAndReplace(MongooseModelsMapEnum.USER, id, replaceUser);

        if (!user) {
            throw new NotFoundException(`User with id #${id} not found`);
        }

        return user;
    }

    async update(id: number, updateUser: IUpdateUser): Promise<IUpdateUserResponse> {
        const user = await this.dbService.findByIdAndUpdate(MongooseModelsMapEnum.USER, id, updateUser);

        if (!user) {
            throw new NotFoundException(`User with id #${id} not found`);
        }

        return user;
    }

    async remove(id: number): Promise<IUser> {
        const replaceUser = await this.dbService.findByIdAndDelete(MongooseModelsMapEnum.USER, id);

        if (!replaceUser) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return replaceUser;
    }
}
