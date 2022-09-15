
import { Filter } from './filter';
import { FilterRaw } from './filter-raw';

export class FilterFactory {

  static fromRaw(f: FilterRaw): Filter {
    return {
      ...f,
    };
  }

  static ToRaw(f: Filter): FilterRaw {
    return {
      ...f,
    };
  }

}
