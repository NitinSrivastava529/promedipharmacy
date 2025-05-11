import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../model/constent';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  TotalInfo: any = {};
  AllTodayMembers: any = {};
  TodayMembers: any = {};
  http = inject(HttpClient);
  global = inject(GlobalService);
  ngOnInit(): void {
    this.GetTotal();
  }
    GetTotal() {
      this.http.get(constant.API_URL + 'api/Product/DashboardTotal').subscribe((res: any) => {
        this.TotalInfo = res;
      })
    }

}
