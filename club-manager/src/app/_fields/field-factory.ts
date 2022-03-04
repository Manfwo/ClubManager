import { Field } from './field';
import { FieldRaw } from './field-raw';

export class FieldFactory {

  static fromRaw(f: FieldRaw): Field{
    return {
      ...f,
      Visible: f.Visible ? true : false
    };
  }
}
