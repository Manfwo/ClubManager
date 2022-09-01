import { ActivityMem } from './activity-mem';
import { ActivityMemRaw } from './activity-mem-raw';

export class ActivityMemFactory {

  static fromRaw(m: ActivityMemRaw): ActivityMem{
    let activity = new ActivityMem();
   activity.Id = m.Id;
   activity.MemberId = m.MemberId;
   activity.Year = m.Year;
   activity.Activity = m.Activity;
   activity.Comment = m.Comment;
   activity.Alias = m.Alias;
   activity.Firstname = m.Firstname;
   activity.Familyname = m.Familyname;
   activity.Street = m.Street;
   activity.Zipcode = m.Zipcode;
   activity.City = m.City

    return activity;
  }

}
