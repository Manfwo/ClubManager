import { PageParameterService } from './../../_shared/page-parameter.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/_shared/custom-paginator';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { PageParameter } from 'src/app/_shared/page-parameter';

@Component({
  selector: 'cl-group-mem-footer-pagination',
  templateUrl: './group-mem-footer-pagination.component.html',
  styleUrls: ['./group-mem-footer-pagination.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Mitglieder pro Seite') }
  ]
})
export class GroupMemberFooterPaginationComponent implements OnInit {

  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;
  pageSize: number;
  pageSizeOptions = [5, 10, 20, 50, 100, 500]

  pageParam: PageParameter = new PageParameter;

  constructor(
    private localStore: LocalStorageService,
    private pageService: PageParameterService,
  ) {}

  ngOnInit(): void {
    // Gesamtanzahl Gruppen übernehmen
    this.pageService.sharedLength.subscribe(value => {
      this.length = value;
    });

    // Init Paginator
    this.pageSize = this.localStore.get('groupmemPageSize');
    this.pageParam.pageSize = this.pageSize;
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
    this.localStore.set('groupmemPageSize',this.pageSize );
    this.pageService.nextMessage(this.pageParam);
  }
}
