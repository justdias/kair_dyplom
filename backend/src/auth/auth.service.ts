import { Injectable, UnauthorizedException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Log } from '../entities/log.entity'; // Импортируем Log сущность
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Log)
    private readonly logsRepository: Repository<Log>, // Добавляем репозиторий Log

    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(registerDto);
    user.password = await bcrypt.hash(user.password, 10);

    try {
      const savedUser = await this.usersRepository.save(user);

      // 🔥 Логирование успешной регистрации в таблицу logs
      await this.logsRepository.save({
        action: 'REGISTER',
        userId: savedUser.id,
        createdAt: new Date(),
      });

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username or email already exists');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.usersRepository.findOne({ where: { email: loginUserDto.email } });
    
    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const passwordMatch = await bcrypt.compare(loginUserDto.password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    // 🔥 Логирование успешного входа в таблицу logs
    await this.logsRepository.save({
      action: 'LOGIN',
      userId: user.id,
      createdAt: new Date(),
    });

    return {
      access_token: accessToken,
    };
  }
}
