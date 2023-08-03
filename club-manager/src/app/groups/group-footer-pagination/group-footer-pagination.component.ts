import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from 'src/app/_shared/custom-paginator';
import { LocalStorageService } from 'src/app/_shared/local-storage.service';
import { PageParameter } from 'src/app/_shared/page-parameter';
import { PageParameterService } from 'src/app/_shared/page-parameter.service';

@Component({
  selector: 'cl-group-footer-pagination',
  templateUrl: './group-footer-pagination.component.html',
  styleUrls: ['./group-footer-pagination.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: CustomPaginator('Gruppen pro Seite') }
  ]
})
export class GroupFooterPaginationComponent implements OnInit {

  // Pagination
  @ViewChild(MatPaginator) paginator: MatPaginator;
  length: number;
  pageSize: number;
  pageSizeOptions = [5, 15, 20, 30, 50]

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
    this.pageSize = this.localStore.get('groupPageSize');
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
    this.localStore.set('groupPageSize',this.pageSize);
    this.pageService.nextMessage(this.pageParam);
  }
}
