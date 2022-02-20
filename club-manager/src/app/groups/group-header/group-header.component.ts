import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-group-header',
  templateUrl: './group-header.component.html',
  styleUrls: ['./group-header.component.scss']
})
export class GroupHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  secondaryNav(path:string) {
    this.router.navigate([{ outlets: {
      sidebar: [path]
    }}]);
  }
}
