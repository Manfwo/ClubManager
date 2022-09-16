import { Group } from './group';
import { GroupRaw } from './group-raw';

export class GroupFactory {

  static fromRaw(g: GroupRaw): Group{
    let group = new Group();
   group.Id = g.Id;
   group.Name = g.Name
   group.Comment = g.Comment;

    return group;
  }

}
