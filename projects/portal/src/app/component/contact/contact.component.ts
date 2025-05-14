import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { enquiry } from '../../models/enquiry';
import { CONSTANT } from '../../models/constant';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  enquiryObj: enquiry = new enquiry();
  IsLoading: boolean = false;
  message = signal('')
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {

  }
  addEnquiry() {
    if (this.validation()) {
      this.IsLoading = true;
      this._http.post(CONSTANT.API_URL + 'api/Enquiry/AddEnquiry', this.enquiryObj, { headers: this._global.headers }).subscribe((res: any) => {
        this.message.set(res)
        this.IsLoading = false;
        this.enquiryObj = new enquiry();
      })
    }
  }
  validation() {
    this.message.set('')
    if (this.enquiryObj.name == '') {
      this.message.set('please provide name')
      return false;
    }
    if (this.enquiryObj.contactNo == '') {
      this.message.set('please provide contact no')
      return false;
    }
    if (this.enquiryObj.subject == '') {
      this.message.set('please provide subject')
      return false;
    }
    if (this.enquiryObj.message == '') {
      this.message.set('please provide message')
      return false;
    }
    return true;
  }
}
