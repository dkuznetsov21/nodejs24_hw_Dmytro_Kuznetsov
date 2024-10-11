import {ConfigService} from "@nestjs/config";
import {DBType} from "../types/enums/database-type.enum";
import {IAbstractDatabaseService} from "../types/database-abstract-service.interface";
import {MongoDatabaseService} from "./mongodb.service";
import {PostgresDatabaseService} from "./postgresdb.service";


export function createDatabaseServiceFactory(
    dbType: DBType,
    configService: ConfigService,
): IAbstractDatabaseService {
    if (dbType === DBType.MONGODB) {
        return new MongoDatabaseService(configService);
    } else if (dbType === DBType.POSTGRES) {
        return new PostgresDatabaseService(configService);
    }
    throw new Error('Unsupported database type');
}
