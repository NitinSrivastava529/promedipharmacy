import { CommonModule, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { GlobalService } from '../../services/global.service';
import { IProduct } from '../../model/IProduct';
import { Product } from '../../model/Product';
import { constant } from '../../model/constent';

@Component({
  selector: 'app-product',
  imports: [CommonModule, FormsModule,JsonPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productList: IProduct[] = [];
  productPhoto:any;
  product: Product = new Product();
  productForUpload: Product = new Product();
  categoryList: any;
    uploadData: any = {
    'Photo': File    
  }
  isLoading: boolean = false;
  isLoading2: boolean = false;
  http = inject(HttpClient);
  temp = "";
  global = inject(GlobalService);
  ngOnInit(): void {
    this.GetCategory()
    this.GetProduct()    
  }
   getImgUrl(file: string) {
    return constant.API_URL+'Resource/Product/' + file;
   // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
  checkGroup(category: string) {
    if (this.temp != category) {
      this.temp = category;
      return true
    }
    else
      return false
  }
  GetCategory() {
    this.http.get(constant.API_URL + 'api/Product/GetCategories').subscribe((res: any) => {
      this.categoryList = res;
    })
  }
  GetProduct() {
    this.http.get(constant.API_URL + 'api/Product/GetProduct').subscribe((res: any) => {
      this.productList = res;
    })
  }
   GetProductPhoto() {
    this.http.get(constant.API_URL + 'api/Product/GetProductPhoto/'+this.productForUpload.productId).subscribe((res: any) => {
      this.productPhoto = res;
    })
  }
  DeleteProduct(productId: string) {
    if (!confirm('are you sure to delete?'))
      return

    this.http.delete(constant.API_URL + 'api/product/DeleteProduct/' + productId).subscribe((res: any) => {
      this.GetProduct()
    });
  }
   DeletePhoto(autoId: number) {
    if (!confirm('are you sure to delete?'))
      return

    this.http.delete(constant.API_URL + 'api/product/DeletePhoto/' + autoId).subscribe((res: any) => {
      this.GetProductPhoto()
    });
  }
    changeFile(event: any) {
    this.uploadData.Photo = event.target.files[0];
  }
  productInfo(productId: string) {
      var val = this.productList.find(x => x.productId == productId);
    if (val != null) {
      this.productForUpload.productId = productId;
      this.productForUpload.category = val.category;
      this.productForUpload.brandName = val.brandName;
      this.productForUpload.productName = val.productName;
      this.productForUpload.mg = val.mg;
      this.productForUpload.qty = val.qty;
      this.product.price = val.price;
      this.productForUpload.discount = val.discount;
      this.productForUpload.description = val.description;
    }
    this.GetProductPhoto()
  }
  Edit(productId: string) {
    var val = this.productList.find(x => x.productId == productId);
    if (val != null) {
      this.product.productId = productId;
      this.product.category = val.category;
      this.product.brandName = val.brandName;
      this.product.productName = val.productName;
      this.product.mg = val.mg;
      this.product.qty = val.qty;
      this.product.price = val.price;
      this.product.discount = val.discount;
      this.product.description = val.description;
    }
  }
  AddProduct() {
    this.isLoading = true;
    this.http.post(constant.API_URL + 'api/product/AddProduct', this.product, { headers: this.global.headers }).subscribe((res: any) => {
      this.GetProduct()
      this.product = new Product();
      this.isLoading = false;
    });
  }
  upload() {
    this.isLoading2=true;
    var formData = new FormData();
    formData.append('AutoId','0');
    formData.append('ProductId',this.productForUpload.productId.toString());
    formData.append('Photo', this.uploadData.Photo);
    this.global.UploadFile('api/Product/UploadPhoto', formData).subscribe((res)=> {     
      this.isLoading2=false;
       this.GetProductPhoto()
    });
  }
}
