export interface IUser {
  userhandle: string;
  email: string;
  password?: string;
  name: string;
  dob: string;
  profileImg?: string;
}

export interface JwtPayload {
  _id: string,
  userhandle: string,
  name: string,
}