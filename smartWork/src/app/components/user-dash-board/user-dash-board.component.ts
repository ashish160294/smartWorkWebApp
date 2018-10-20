import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-user-dash-board',
  templateUrl: './user-dash-board.component.html',
  styleUrls: ['./user-dash-board.component.css']
})
export class UserDashBoardComponent implements OnInit {
  records = [];
  constructor(private dashBoardService: DashboardService ) { }

  ngOnInit() {
    this.dashBoardService.fetchUserRequests().subscribe((requestRecords) => {
      this.records = requestRecords['data'];
    });
  }

}
