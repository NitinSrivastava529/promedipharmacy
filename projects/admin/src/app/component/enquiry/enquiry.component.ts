import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { constant } from '../../model/constent';

@Component({
  selector: 'app-enquiry',
  imports: [CommonModule, FormsModule],
  templateUrl: './enquiry.component.html',
  styleUrl: './enquiry.component.css'
})
export class EnquiryComponent implements OnInit {
  enquiryList: any;
  _http = inject(HttpClient);
  _global = inject(GlobalService)
  ngOnInit(): void {
    this.GetEnquiries();
  }
  GetEnquiries() {
    this._http.get(constant.API_URL + 'api/Enquiry/GetEnquiries').subscribe((res: any) => {
      this.enquiryList = res;
    })
  }
     DeleteEnquiry(autoId: number) {
    if (!confirm('are you sure to delete?'))
      return

    this._http.delete(constant.API_URL + 'api/enquiry/DeleteEnquiry/' + autoId).subscribe((res: any) => {
      this.GetEnquiries()
    });
  }
}
