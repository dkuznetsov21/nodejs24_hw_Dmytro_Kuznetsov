import {Injectable, NotFoundException, UnprocessableEntityException} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {IUser} from "./interfaces/user.interface";
import {ReplaceUserDto} from "./dto/replace-user.dto";
import {IUpdateUserPartialInput} from "./interfaces/update-user-partial-input.interface";

const users: IUser[] = [];

@Injectable()
export class UsersService {
    private currentId = 1;

    create(createUserDto: CreateUserDto): IUser {
        const newUser: IUser = {
            id: this.currentId++,
            ...createUserDto,
        };

        users.push(newUser);

        return newUser;
    }

    findAll(): IUser[] {
        return users;
    }

    findOneById(id: number): IUser {
        const user = users.find(user => user.id === id);

        if (!user) {
            throw new NotFoundException(`User with id #${id} not found`);
        }

        return user;
    }

    findOneByFirstName(firstName: string): IUser {
        const user = users.find((user) => user.firstName === firstName);

        if (!user) {
            throw new NotFoundException(
                `User with first name ${firstName} not found`,
            );
        }
        return user;
    }

    findOneWithoutException(firstName: string): IUser {
        return users.find((user) => user.firstName === firstName);
    }

    findOneAndUpdate(id: number, updateBody: IUpdateUserPartialInput): IUser {
        const user = this.findOneById(id);
        return this.updatePartially(user.id, updateBody);
    }

    updatePartially(id: number, dto: IUpdateUserPartialInput): IUser {
        const userIndex = users.findIndex((user) => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        if (dto.hasOwnProperty('id')) {
            throw new UnprocessableEntityException(
                'Updating the "id" field is not allowed',
            );
        }

        const updatedUser = { ...users[userIndex], ...dto };
        users[userIndex] = updatedUser;

        return updatedUser;
    }

    replace(id: number, replaceUserDto: ReplaceUserDto): IUser {
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User with id #${id} not found`);
        }

        const updatedUser = {
            id,
            ...replaceUserDto,
        };

        users[userIndex] = updatedUser;

        return updatedUser;
    }

    update(id: number, updateUserDto: UpdateUserDto): IUser | object {
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User with id #${id} not found`);
        }

        const updatedUser = {
            ...users[userIndex],
            ...updateUserDto,
        };

        users[userIndex] = updatedUser;

        return updatedUser;
    }

    remove(id: number): object {
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new NotFoundException(`User with id #${id} not found`);
        }

        users.splice(userIndex, 1);

        return {
            status: 'success',
            message: `User with id #${id} has been removed`
        };
    }
}
