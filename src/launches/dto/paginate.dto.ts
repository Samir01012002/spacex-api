import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class PaginateDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El límite debe ser un número entero' })
  @Min(1, { message: 'El límite debe ser al menos 1' })
  limit: number;

  @IsOptional()
  @IsString({ message: 'El lastKey debe ser un string' })
  lastKey?: string;
}
