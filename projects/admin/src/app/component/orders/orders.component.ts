import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { constant } from '../../model/constent';
import { IOrders } from '../../model/orders';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../model/IProduct';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orderList: IOrders[] = [];
  orderInfo: IProduct[] = [];
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {
    this.GetOrders();
  }
     getImgUrl(file: []) {
    return constant.API_URL+'Resource/Product/' + file.at(0);
   // return this.sanitizer.bypassSecurityTrustResourceUrl(CONSTANT.API_URL+'/Resource/Plan/' + file);
  }
  GetOrders() {
    this._http.get(constant.API_URL + 'api/Order/GetOrders').subscribe((res: any) => {
      this.orderList = res
    })
  }
  DeleteOrder(orderNo: string) {
    if (!confirm('are you sure to delete?'))
      return

    this._http.delete(constant.API_URL + 'api/Order/DeleteOrder?Order=' + orderNo).subscribe((res: any) => {
      this.GetOrders()
    });
  }
  OrderInfo(orderNo: string) {
    this._http.get(constant.API_URL + 'api/Order/GetOrderInfo/' + orderNo).subscribe((res: any) => {
      this.orderInfo = res;
      console.log(res)
    })
  }
}
