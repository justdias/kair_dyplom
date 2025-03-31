import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto'; // Импортируем новый DTO

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Метод для поиска пользователя по email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // Метод для создания нового пользователя
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  // Метод для обновления роли пользователя
  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: +id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    // Проверка на пустой username
    if (!user.username) {
      throw new BadRequestException('Username cannot be null or empty');
    }

    user.role = updateRoleDto.role; // Обновляем роль
    return this.userRepository.save(user); // Сохраняем обновленного пользователя
  }

  // Метод для поиска пользователя по id
  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: +id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
