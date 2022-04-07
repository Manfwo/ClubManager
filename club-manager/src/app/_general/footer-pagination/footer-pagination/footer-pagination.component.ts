import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomPaginator } from './../../../_shared/custom-paginator';

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
  pageTotalCount: number = 500;
  pageCount: number = 25;

  constructor() { }

  ngOnInit(): void {
  }

}
