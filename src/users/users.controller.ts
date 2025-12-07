import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParamPipe } from '../common/uuid.pipe';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserResponse } from '../common/swagger-models';

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserResponse, isArray: true })
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User not found' })
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiCreatedResponse({ type: UserResponse })
  @ApiBadRequestResponse({
    description: 'Body does not contain required fields',
  })
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto.login, dto.password);
  }

  @Put(':id')
  @ApiOkResponse({ type: UserResponse })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiForbiddenResponse({ description: 'Old password is wrong' })
  @ApiNotFoundResponse({ description: 'User not found' })
  update(
    @Param('id', UuidParamPipe) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(
      id,
      dto.oldPassword,
      dto.newPassword,
    );
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiBadRequestResponse({ description: 'Id is invalid (not uuid)' })
  @ApiNotFoundResponse({ description: 'User not found' })
  remove(@Param('id', UuidParamPipe) id: string) {
    this.usersService.remove(id);
  }
}
