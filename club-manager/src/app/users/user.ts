export interface User {
  Id: number;
  Username: string;
  Fullname: string;
  Password: string;
  Role: string;
  Unsuccessfull: number;
  Mail: string;
  LastAccess: Date;
  LastUnsuccessfull: Date;
}
