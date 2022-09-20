import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { PageParameter } from 'src/app/_shared/page-parameter';
import { PageParameterService } from 'src/app/_shared/page-parameter.service';
import { ResultValue } from 'src/app/_shared/result-value';
import { GroupStoreService } from '../group-store.service';

@Component({
  selector: 'cl-group-footer-pagination',
  templateUrl: './group-footer-pagination.component.html',
  styleUrls: ['./group-footer-pagination.component.scss']
})
export class GroupFooterPaginationComponent implements OnInit {

  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;
  pageSize: number;
  pageSizeOptions = [5, 10, 20, 50, 100, 1000]

  count$: Observable<ResultValue>;
  loading = true;           // Kennungn für Spinner
  pageParam: PageParameter = new PageParameter;
  groupId = 0;

  constructor(
    private localStore: LocalStorageService,
    private storeService: GroupStoreService,
    private pageService: PageParameterService,
  ) {}

  ngOnInit(): void {
    // Init Paginator
    this.pageSize = this.localStore.get('groupmemPageSize');
    this.loading = true;
    this.count$ = this.storeService.getGroupMemCount(this.groupId)
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
