import { Activity } from './activity';
import { ActivityRaw } from './activity-raw';

export class ActivityFactory {

  static fromRaw(m: ActivityRaw): Activity{
    let activity = new Activity();
   activity.Id = m.Id;
   activity.MemberId = m.MemberId;
   activity.Year = m.Year;
   activity.Activity = m.Activity;
   activity.Comment = m.Comment;

    return activity;
  }

}
