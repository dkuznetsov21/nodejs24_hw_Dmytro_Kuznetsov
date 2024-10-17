import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {ReplaceUserDto} from "./dto/replace-user.dto";
import {
  ApiBearerAuth,
  ApiOkResponse, ApiParam, ApiResponse, ApiSecurity,
  ApiTags
} from "@nestjs/swagger";
import {CreateUserResponseDto} from "./dto/create-user-response.dto";
import {UpdateUserResponseDto} from "./dto/update-user-response";
import {IUpdateUserResponse} from "./interfaces/update-user-response.interface";
import {IReplaceUserResponse} from "./interfaces/replace-user-response.interface";
import {ReplaceUserResponseDto} from "./dto/replace-user-response";
import {DeleteUserResponseDto} from "./dto/delete-user-response.dto";

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiResponse({ status: 201, description: 'User has been created', type: CreateUserResponseDto })
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({ status: 200, description: 'Get array of users.', type: CreateUserResponseDto })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiParam({name: 'id', required: true, type: 'integer'})
  @ApiOkResponse({ status: 200, description: 'Get one user.', type: CreateUserResponseDto })
  findOne(@Param('id', ParseIntPipe) id) {
    return this.usersService.findOneById(id);
  }

  @Put(':id')
  @ApiParam({name: 'id', required: true, type: 'integer'})
  @ApiOkResponse({ status: 200, description: 'User updated successfully.', type: ReplaceUserResponseDto})
  replaceUser(@Param('id', ParseIntPipe) id, @Body() replaceUserDto: ReplaceUserDto): Promise<IReplaceUserResponse> {
    return this.usersService.replace(id, replaceUserDto);
  }

  @Patch(':id')
  @ApiParam({name: 'id', required: true, type: 'integer'})
  @ApiOkResponse({ status: 200, description: 'User updated successfully.', type: UpdateUserResponseDto})
  update(@Param('id', ParseIntPipe) id, @Body() updateUserDto: UpdateUserDto): Promise<IUpdateUserResponse> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiParam({name: 'id', required: true, type: 'integer'})
  @ApiOkResponse({ status: 200, description: 'User deleted successfully.', type: DeleteUserResponseDto})
  remove(@Param('id', ParseIntPipe) id) {
    return this.usersService.remove(id);
  }
}
