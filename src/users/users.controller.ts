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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UuidParamPipe } from '../common/uuid.pipe';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getById(@Param('id', UuidParamPipe) id: string) {
    return this.usersService.findById(id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto.login, dto.password);
  }

  @Put(':id')
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
  remove(@Param('id', UuidParamPipe) id: string) {
    this.usersService.remove(id);
  }
}
