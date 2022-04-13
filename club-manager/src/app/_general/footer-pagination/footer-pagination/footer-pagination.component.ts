import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './../../../_shared/custom-paginator';
import { LocalStorageService } from './../../../_shared/local-storage.service';
import { MemberStoreService } from '../../../members/member-store.service';
import { ResultValue } from './../../../_shared/result-value';
import { PageParameterService } from './../../../_shared/page-parameter.service';
import { PageParameter } from './../../../_shared/page-parameter';

@Component({
  selector: 'cl-footer-pagination',
  templateUrl: './footer-pagination.component.html',
  styleUrls: ['./footer-pagination.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Mitglieder pro Seite') }
  ]
})
export class FooterPaginationComponent implements OnInit {

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
    private mb: MemberStoreService,
    private ps: PageParameterService,
  ) { }

  ngOnInit(): void {
    // Init Paginator
    this.pageSize = this.localStore.get('memberPageSize');
    this.loading = true;
    this.count$ = this.mb.getCount('');
    this.count$.subscribe( result => {
      this.length = result[0].resCount;
      this.loading = false;

      this.pageParam.pageLength = this.length;
      this.pageParam.pageSize = this.pageSize;
      this.pageParam.pageIndex = 0;
      this.ps.nextMessage(this.pageParam);
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
    this.ps.nextMessage(this.pageParam);
  }
}
