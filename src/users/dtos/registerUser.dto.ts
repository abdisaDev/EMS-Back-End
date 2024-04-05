import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmpty()
  password: string;
}
