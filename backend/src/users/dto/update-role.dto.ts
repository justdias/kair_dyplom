// src/users/dto/update-role.dto.ts

import { IsString } from 'class-validator';

export class UpdateRoleDto {
  @IsString()
  role: string; // Роль, которую мы будем назначать
}
