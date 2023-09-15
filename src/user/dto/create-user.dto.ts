import { IsAlphanumeric, IsIn, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsAlphanumeric()
  password: string;

  @IsNotEmpty()
  @IsIn(['admin', 'seller', 'supporter', 'customer'])
  role: string;
}
