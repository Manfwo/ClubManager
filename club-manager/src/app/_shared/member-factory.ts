import { Member } from './member';
import { MemberRaw } from './member-raw';

export class MemberFactory {

  static fromRaw(m: MemberRaw): Member {
    return {
      ...m,
      Entryday: new Date(m.Entryday)
    };
  }
}
