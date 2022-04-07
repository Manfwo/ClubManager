import { History } from './history';
import { HistoryRaw } from './history-raw';

export class HistoryFactory {

  static fromRaw(h: HistoryRaw): History {
    let history = new History();

    if (h != undefined) {
      history.Id = h.Id;
      history.User = h.User;
      history.Action = h.Action;
      history.Description = h.Description;
      history.Table = h.Table;
      history.RecordId = h.RecordId;
      history.Changedate = this.getDateToString(h.ChangeDate);
    }
    return history;
  }

  // Datum konvertieren mit führenden Nullen
  static getDateToString (d: Date): string {
    let da = new Date(d);

    let mm = da.getMonth() + 1; // Months start at 0!
    let dd = da.getDate();
    let yy = da.getFullYear();

    let dstr = String(dd);
    let mstr = String(mm);
    if (dd < 10) dstr = '0' + dd;
    if (mm < 10) mstr = '0' + mm;

    return dstr + '.' + mstr + '.' + yy;
  }

}
