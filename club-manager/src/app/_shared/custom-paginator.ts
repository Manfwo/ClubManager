import { MatPaginatorIntl } from '@angular/material/paginator';

export function CustomPaginator(customLabel: string ): MatPaginatorIntl {
  const customPaginatorIntl = new MatPaginatorIntl();
  customPaginatorIntl.itemsPerPageLabel = customLabel + ':';
  customPaginatorIntl.nextPageLabel = 'Nächste Seite';
  customPaginatorIntl.previousPageLabel = 'Vorherige Seite';
  return customPaginatorIntl;
}

