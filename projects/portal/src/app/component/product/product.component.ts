import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CONSTANT } from '../../models/constant';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productQuickView: any;
  products: any;
  category: any;
  productList: any;
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {
    this._global.loadScript();
    this.GetProduct();             
    this.GetCategories();             
  }
  getImgUrl(file: string) {
    return CONSTANT.API_URL + 'Resource/Product/' + file;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
  QuickView(productId: string) {
    var val = this.productList.filter((i: any) => i.productId == productId)
    this.productQuickView = val[0];
  }
  filter(name: string) {
    if (name.length == 0)
      this.productList = this.products;
    else
      this.productList = this.products.filter((i: any) => 
    i.category.toLowerCase().startsWith(name.toLowerCase()) ||
    i.productName.toLowerCase().startsWith(name.toLowerCase())
    );
  }
  GetProduct() {
    this._http.get(CONSTANT.API_URL + 'api/Product/GetProduct').subscribe((res: any) => {
      this.products = res;
      this.productList = res;
    })
  }
    GetCategories() {
    this._http.get(CONSTANT.API_URL + 'api/Product/GetCategories').subscribe((res: any) => {    
      this.category = res;      
    })
  }
}
