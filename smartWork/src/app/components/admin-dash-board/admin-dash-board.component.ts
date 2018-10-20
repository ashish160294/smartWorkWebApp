import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {
  records = [];
  constructor( private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.fetchAllRequests().subscribe((data) => {
      this.records = data['data'];
    });
  }
  updateStatus(record, newStatus) {
    const payload = {
      id: record._id,
      status: newStatus,
      userName: JSON.parse(localStorage.getItem('currentUser')).UserName // feild for Approver
    };
    this.dashboardService.updateStatus(payload).subscribe((resp) => {
      this.dashboardService.fetchAllRequests().subscribe((response) => {
        this.records = response['data'];
      });
    });
  }

}
