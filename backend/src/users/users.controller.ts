import { Controller, Param, Body, Put, UseGuards, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateRoleDto } from './dto/update-role.dto'; // создаем DTO для обновления роли

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Put(':id/role')
  @UseGuards(JwtAuthGuard, RolesGuard) // Проверка авторизации и роли
  @Roles('admin') // Только администраторы могут изменять роль
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ) {
    // Проверка на пустой username
    const user = await this.usersService.findById(id);
    if (!user.username) {
      throw new BadRequestException('Username cannot be null or empty');
    }

    return await this.usersService.updateRole(id, updateRoleDto);
  }
}
