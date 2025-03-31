import { Controller, Put, Post, Param, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UpdateRoleDto } from '../users/dto/update-role.dto';
import { LoginUserDto } from '../users/dto/login-user.dto'; // Импортируем DTO для логина
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Put('assign-role/:userId')
  async assignRole(
    @Param('userId') userId: string, // Параметр теперь строка
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.usersService.updateRole(userId, updateRoleDto); // Обновляем роль пользователя
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto); // Вызов сервиса для логина
  }

  @Post('register')  // 🔥 Теперь твой маршрут доступен по адресу: /auth/register
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
}
