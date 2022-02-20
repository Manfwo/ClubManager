import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cl-activity-header',
  templateUrl: './activity-header.component.html',
  styleUrls: ['./activity-header.component.scss']
})
export class ActivityHeaderComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  secondaryNav(path:string) {
    this.router.navigate([{ outlets: {
      sidebar: [path]
    }}]);
  }
}
