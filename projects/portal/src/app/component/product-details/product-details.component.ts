import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../models/constant';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  productList: any;
  productId:string="";
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor(private route:ActivatedRoute) {   this._global.loadScript() }
  ngOnInit(): void {          
    this.productId=this.route.snapshot.params['id']
    this.GetProduct();

  }
  getImgUrl(file: string) {
    return CONSTANT.API_URL + 'Resource/Product/' + file;
    // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
  GetProduct() {
    this._http.get(CONSTANT.API_URL + 'api/Product/GetProduct/'+this.productId).subscribe((res: any) => {
      console.log(res)
      this.productList = res;    
    })
  }
}