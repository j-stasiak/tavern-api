export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  password?: string;
  email?: string;
  username?: string;
  isActive?: boolean;
  info?: UserInfoDto;
}

export interface UserInfoDto {
  level?: number;
  experience?: number;
  experienceToNextLevel?: number;
  rank?: string;
  reputation?: number;
}
