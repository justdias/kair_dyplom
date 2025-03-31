// auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Используй базовый AuthGuard

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { // Указываем, что это стратегия jwt
  constructor() {
    super();
  }
}
