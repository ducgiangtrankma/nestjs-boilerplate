import { IsNotEmpty } from 'class-validator';

export class RegisterReqDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}
