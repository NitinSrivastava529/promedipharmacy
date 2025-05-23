import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../models/constant';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule,FormsModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {
  productList: any;
   productQuickView: any;
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {
    this._global.loadScript();
    //this.productList=['cialis 20 mg.jpg','cialis 40 mg.jpg','oxycodone.jpg','percocet.png','soma 350 mg.jpg','soma 500 mg.jpg','trakem tramadol.jpg','tramadol 100 mg.jpg','tramadol.jpg','ultram tramadol 100mg.jpg','viagra 100.jpg','viagra 200.jpg']
    this.GetProduct()
  }
  QuickView(productId: string) {
    var val = this.productList.filter((i: any) => i.productId == productId)
    this.productQuickView = val[0];
  }
     getImgUrl(file:string) {
     //console.log(file)
    return CONSTANT.API_URL + 'Resource/Product/' + file;
     // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
    }
  GetProduct() {
    this._http.get(CONSTANT.API_URL + 'api/Product/GetProduct').subscribe((res: any) => {
      this.productList = res;
    //  this.productList = this.productList.map((i:any)=>i.photo[0]);      
    })
  }
}
