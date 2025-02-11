import { Exclude, Expose } from 'class-transformer';
import { Types } from 'mongoose';

export class UserResDto {
  @Expose()
  _id: Types.ObjectId;

  @Expose()
  username: string;

  @Expose()
  roles: string[];
}

@Exclude()
export class AccountLoginResDto {
  data: UserResDto;

  accessToken: string;

  refreshToken: string;
}
