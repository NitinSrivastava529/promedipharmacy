import { AfterContentInit, AfterRenderOptions, AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CONSTANT } from '../../models/constant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TestComponent } from "../test/test.component";

@Component({
  selector: 'app-index',
  imports: [RouterLink, CommonModule, FormsModule, TestComponent,TestComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit,AfterViewInit {
  productQuickView: any;
  productList: any;
  bannerList: any;
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {  
   this.GetProduct()    
   this.GetBanner()    
  }
  ngAfterViewInit(): void {
      this._global.loadScript();
  }
  getImgUrl(file: string) {
    return CONSTANT.API_URL + 'Resource/Product/' + file;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
    getBannerUrl(file: string) {
    return CONSTANT.API_URL + 'Resource/Banner/' + file;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
   QuickView(productId: string) {
    var val = this.productList.filter((i: any) => i.productId == productId)
    this.productQuickView = val[0];
  }
  GetProduct() {
    this._http.get(CONSTANT.API_URL + 'api/Product/GetProduct').subscribe((res: any) => {  
      this.productList = res.splice(0,4);
    })
  }
   GetBanner() {
    this._http.get(CONSTANT.API_URL + 'api/Banner/GetBanners').subscribe((res: any) => {  
      this.bannerList = res.splice(0,2);  
    })
  }
}
