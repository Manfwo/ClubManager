import { User } from './user';
import { UserRaw } from './user-raw';

export class UserFactory {

  static fromRaw(u: UserRaw): User {
    return {
      ...u,
      LastAccess: new Date(u.LastAccess),
      LastUnsuccessfull: new Date(u.LastUnsuccessfull)
    };
  }
}
