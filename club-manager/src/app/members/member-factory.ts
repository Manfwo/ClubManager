import { Member } from './member';
import { MemberRaw } from './member-raw';

export class MemberFactory {

  static fromRaw(m: MemberRaw): Member {
    let member = new Member();
    member.Id = m.Id;
    member.WParentId = m.WParentId;
    member.MParentId = m.MParentId;
    member.PartnerId = m.PartnerId;
    member.HasChilds = m.HasChilds;
    member.Alias = m.Alias;
    member.Title = m.Title;
    member.Firstname = m.Firstname;
    member.Familyname = m.Familyname;
    member.Street = m.Street;
    member.Zipcode = m.Zipcode ;
    member.City = m.City;
    member.Phone = m.Phone;
    member.Mail = m.Mail.toLowerCase();
    member.Birthname = m.Birthname;
    member.Age = m.Age;
    member.MemberYears = m.MemberYears;
    member.ActiveYears = m.ActiveYears;
    member.ActivePoints =m.ActivePoints;
    member.Bronze = m.Bronze ;
    member.Silver = m.Silver;
    member.Gold = m.Gold ;
    member.Active4x11 = m.Active4x11;
    member.Active5x11 = m.Active5x11 ;
    member.Active6x11 = m.Active6x11;
    member.Active7x11 = m.Active7x11;
    member.Active8x11 = m.Active8x11;
    member.GoldLion = m.GoldLion;
    member.GoldLionNumber = m.GoldLionNumber;
    member.GoldLionBrilliant= m.GoldLionNBrilliant;
    member.GoldLionBrilliantNumber= m.GoldLionNBrilliantNumber;
    member.TributeMember = m.TributeMember;
    member.Comment = m.Comment;
    member.ExternalId = m.ExternalId;

    member.Resign = m.Resign;
    member.ResignReason = m.ResignReason;

    // Sonderfälle
    if (m.Gender =='m')
      member.Gender = 'Herr'
    else
      member.Gender = 'Frau'

    if (m.AddressInvalid == 0)
      member.AddressInvalid = 'nein'
    else
      member.AddressInvalid = 'ja'

    if (m.Active == 0)
      member.Active = 'nein'
    else
      member.Active = 'ja'

    if (m.BrokenYears == 0)
      member.BrokenYears = 'nein'
    else
      member.BrokenYears = 'ja'

    if (m.Flag == 0)
      member.Flag = 'nein'
    else
      member.Flag = 'ja'

    member.Birthday = this.getDateToString(m.Birthday);
    member.Entryday = this.getDateToString(m.Entryday);
    member.ResignDate = this.getDateToString(m.ResignDate);

    return member;
  }

  static toRaw(m: Member): MemberRaw {
    let member = new MemberRaw();
    member.Id = m.Id;
    member.WParentId = m.WParentId;
    member.MParentId = m.MParentId;
    member.PartnerId = m.PartnerId;
    member.HasChilds = m.HasChilds;
    member.Alias = m.Alias;
    member.Title = m.Title;
    member.Firstname = m.Firstname;
    member.Familyname = m.Familyname;
    member.Street = m.Street;
    member.Zipcode = m.Zipcode ;
    member.City = m.City;
    member.Phone = m.Phone;
    member.Mail = m.Mail.toLowerCase();
    member.Birthname = m.Birthname;
    member.Age = m.Age;
    member.MemberYears = m.MemberYears;
    member.ActiveYears = m.ActiveYears;
    member.ActivePoints =m.ActivePoints;
    member.Bronze = m.Bronze ;
    member.Silver = m.Silver;
    member.Gold = m.Gold ;
    member.Active4x11 = m.Active4x11;
    member.Active5x11 = m.Active5x11 ;
    member.Active6x11 = m.Active6x11;
    member.Active7x11 = m.Active7x11;
    member.Active8x11 = m.Active8x11;
    member.GoldLion = m.GoldLion;
    member.GoldLionNumber = m.GoldLionNumber;
    member.GoldLionNBrilliant = m.GoldLionBrilliant;
    member.GoldLionNBrilliantNumber = m.GoldLionBrilliantNumber;
    member.TributeMember = m.TributeMember;
    member.Comment = m.Comment;
    member.ExternalId = m.ExternalId;

    member.Resign = m.Resign;
    member.ResignReason = m.ResignReason;

    // Sonderfälle
    if (m.Gender =='Herr')
      member.Gender = 'm'
    else
      member.Gender = 'w'

    if (m.AddressInvalid == "nein")
      member.AddressInvalid = 0
    else
      member.AddressInvalid = 1

    if (m.Active == 'nein')
      member.Active = 0
    else
      member.Active = 1

    if (m.BrokenYears == 'nein')
      member.BrokenYears = 0
    else
      member.BrokenYears = 1

    if (m.Flag == 'nein')
      member.Flag = 0
    else
      member.Flag = 1

    member.Birthday = this.getStringToDate(m.Birthday);
    member.Entryday = this.getStringToDate(m.Entryday);
    member.ResignDate = this.getStringToDate(m.ResignDate);

    return member;
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

  // Konvertierung string zu Datum
  static getStringToDate (d: string): Date {
    let parts = d.split(".");
    let date = new Date(Date.UTC(Number(parts[2]),Number(parts[1])-1,Number(parts[0]), 0, 0, 0));
    return date
  }

}
