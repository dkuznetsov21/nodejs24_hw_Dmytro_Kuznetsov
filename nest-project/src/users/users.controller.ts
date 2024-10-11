import {Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, ParseIntPipe, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ReplaceUserDto} from "./dto/replace-user.dto";
import {IUser} from "./interfaces/user.interface";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id, @Body() replaceUserDto: ReplaceUserDto) {
    return this.usersService.replace(id, replaceUserDto);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    return this.usersService.remove(id);
  }
}
