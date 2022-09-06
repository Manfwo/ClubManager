import { SettingTransferService } from 'src/app/_general/settings/setting-transfer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable} from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from '../../_shared/custom-paginator';
import { LocalStorageService } from '../../_shared/local-storage.service';
import { MemberStoreService } from '../member-store.service';
import { ResultValue } from '../../_shared/result-value';
import { PageParameterService } from '../../_shared/page-parameter.service';
import { PageParameter } from '../../_shared/page-parameter';

@Component({
  selector: 'cl-member-footer-pagination',
  templateUrl: './member-footer-pagination.component.html',
  styleUrls: ['./member-footer-pagination.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Mitglieder pro Seite') }
  ]
})
export class MemberFooterPaginationComponent implements OnInit {

  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;
  pageSize: number;
  pageSizeOptions = [5, 10, 25, 50, 100]


  count$: Observable<ResultValue>;
  loading = true;           // Kennungn für Spinner
  pageParam: PageParameter = new PageParameter;
  memberResignList = 'n';
  oldresignList: string;

  constructor(
    private localStore: LocalStorageService,
    private storeService: MemberStoreService,
    private pageService: PageParameterService,
  ) {}


  ngOnInit(): void {
    // Settings für ehemalige Mitglieder lesen
    this.memberResignList = this.localStore.get('member_resign');

    // Init Paginator
    this.pageSize = this.localStore.get('memberPageSize');
    this.loading = true;
    this.count$ = this.storeService.getCount('',this.memberResignList);
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

  ngDoCheck(): void {
    if (this.memberResignList != this.oldresignList) {
      this.oldresignList = this.memberResignList;
      this.count$ = this.storeService.getCount('',this.memberResignList);
      this.count$.subscribe( result => {
        this.length = result[0].resCount;
        this.pageParam.pageIndex = 0;
      });
    }
  }

  onChangePage() {
    this.pageParam.pageLength = this.length;
    this.pageParam.pageIndex = this.paginator.pageIndex;
    this.pageParam.pageSize = this.paginator.pageSize;
    this.pageService.nextMessage(this.pageParam);
  }

}
