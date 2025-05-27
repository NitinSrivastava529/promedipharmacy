import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { constant } from '../../model/constent';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-banner',
  imports: [CommonModule, FormsModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent implements OnInit {
  bannerList: any;
  isLoading: boolean = false;
  uploadData: any = {
    'file': File
  }
  selectedFile : File | null = null;
  _http = inject(HttpClient)
  global = inject(GlobalService)
  changeFile(event: any) {
    this.selectedFile  = event.target.files[0];
  }
  ngOnInit(): void {
    this.GetBanner();
  }
  getBannerUrl(file: string) {
    return constant.API_URL + 'Resource/Banner/' + file;
  }
  GetBanner() {
    this._http.get(constant.API_URL + 'api/Banner/GetBanners').subscribe((res: any) => {
      this.bannerList = res;
    })
  }
  upload() {
      if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.isLoading = true;
    this.global.UploadFile('api/Banner/add',formData).subscribe((res) => {
      this.GetBanner()
      this.isLoading = false; 
    });
  }
  delete(autoId: number) {
    if (!confirm('are you sure to delete?'))
      return

    this._http.delete(constant.API_URL + 'api/banner/delete/' + autoId).subscribe((res: any) => {
      this.GetBanner()
    });
  }

}
