import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {IUser} from "./interfaces/user.interface";
import {ReplaceUserDto} from "./dto/replace-user.dto";

@Injectable()
export class UsersService {
    private users: IUser[] = [];
    private currentId = 1;

    create(createUserDto: CreateUserDto): IUser {
        const newUser: IUser = {
            id: this.currentId++,
            ...createUserDto,
        };

        this.users.push(newUser);

        return newUser;
    }

    findAll(): IUser[] {
        return this.users;
    }

    findOne(id: number): IUser {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    replace(id: number, replaceUserDto: ReplaceUserDto): IUser {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new HttpException(`User with id #${id} not found`, HttpStatus.NOT_FOUND);
        }

        const updatedUser = {
            id,
            ...replaceUserDto,
        };

        this.users[userIndex] = updatedUser;

        return updatedUser;
    }

    update(id: number, updateUserDto: UpdateUserDto): IUser | object {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new HttpException(`User with id #${id} not found`, HttpStatus.NOT_FOUND);
        }

        const updatedUser = {
            ...this.users[userIndex],
            ...updateUserDto,
        };

        this.users[userIndex] = updatedUser;

        return updatedUser;
    }

    remove(id: number): object {
        const userIndex = this.users.findIndex(user => user.id === id);

        if (userIndex === -1) {
            throw new HttpException(`User with id #${id} not found`, HttpStatus.NOT_FOUND);
        }

        this.users.splice(userIndex, 1);

        return {
            status: 'success',
            message: `User with id #${id} has been removed`
        };
    }
}
