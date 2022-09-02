import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../../_shared/custom-paginator';
import { LocalStorageService } from '../../_shared/local-storage.service';
import { ResultValue } from '../../_shared/result-value';
import { PageParameterService } from '../../_shared/page-parameter.service';
import { PageParameter } from '../../_shared/page-parameter';
import { ActivityStoreService } from '../activity-store.service';

@Component({
  selector: 'cl-activity-footer-pagination',
  templateUrl: './activity-footer-pagination.component.html',
  styleUrls: ['./activity-footer-pagination.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Aktivitäten pro Seite') }
  ]
})
export class ActivityFooterPaginationComponent implements OnInit {

  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;
  pageSize: number;
  pageSizeOptions = [5, 10, 25, 50, 100]

  count$: Observable<ResultValue>;
  loading = true;           // Kennungn für Spinner
  pageParam: PageParameter = new PageParameter;

  constructor(
    private localStore: LocalStorageService,
    private storeService: ActivityStoreService,
    private pageService: PageParameterService,
  ) { }

  ngOnInit(): void {
    // Init Paginator
    this.pageSize = this.localStore.get('activityPageSize');
    this.loading = true;
    this.count$ = this.storeService.getCount('','');
    this.count$.subscribe( result => {
      this.length = result[0].resCount;
      this.loading = false;

      this.pageParam.pageLength = this.length;
      this.pageParam.pageSize = this.pageSize;
      this.pageParam.pageIndex = 0;
      this.pageService.nextMessage(this.pageParam);
    });
  }

  ngAfterViewInit(): void {
    // wegen Error: Expression has Changed After It was Checked
    setTimeout(() => {
      this.paginator.pageSize = this.pageSize;
      this.paginator.pageIndex = 0;
    });
  }

  onChangePage() {
    this.pageParam.pageLength = this.length;
    this.pageParam.pageIndex = this.paginator.pageIndex;
    this.pageParam.pageSize = this.paginator.pageSize;
    this.pageService.nextMessage(this.pageParam);
  }
}
