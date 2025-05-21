import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, numberAttribute, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../models/constant';
import { single } from 'rxjs';
import { Order, orderItem } from '../../models/order';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  changeDetection: ChangeDetectionStrategy.Default
})
export class CartComponent implements OnInit {
  IsLoading: boolean = false;
  order: Order = new Order();
  message = signal('')
  totalValue = [{
    qty: 0,
    discount: 0,
    amount: 0,
    total: 0
  }];
  total = signal(this.totalValue);
  cartItem: orderItem[] = [];
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  _router = inject(Router);
  constructor() { }
  ngOnInit(): void {
    this.loadCart()
  }
  ChangeQty(indx: number, type: string) {
    const item = this.cartItem[indx];
    if (type == 'plus') {
      item.qty = Number(item.qty) + 1;
    }
    if (type == 'minus') {
      item.qty = Number(item.qty) - 1;
    }
    console.log(this.cartItem)
    localStorage.setItem('cart', JSON.stringify(this.cartItem))
    this.loadCart()
  }
  getImageUrl(file: []) {
    return CONSTANT.API_URL + 'Resource/Product/' + file.at(0);
  }
  loadCart() {
    if (!localStorage.hasOwnProperty('cart')) {
      this.total()[0].qty = 0
      return
    }

    this.cartItem = JSON.parse(localStorage.getItem('cart') || '');
    if (this.cartItem.length > 0)
      this.SubTotal()
    else
      this.total()[0].qty = 0

    console.log(this.cartItem)
  }
  SubTotal() {
    var obj = { qty: 0, discount: 0, amount: 0, total: 0 }
    this.cartItem.forEach(i => {
      obj.qty += +i.qty
      obj.discount += ((+i.qty==1)?0:+i.discount*(+i.qty-1))
      obj.amount += +i.price * (+i.qty)
      obj.total = +obj.amount - +obj.discount
    });
    this.total()[0].qty = obj.qty;
    this.total()[0].discount = obj.discount;
    this.total()[0].amount = obj.amount;
    this.total()[0].total = obj.total;

    this.order.orderItem = Object.assign([...this.cartItem]);
    this.order.qty = this.total()[0].qty;
    this.order.amount = this.total()[0].amount;
    this.order.discount = this.total()[0].discount;
    this.order.total = this.total()[0].total;
  }
  removeItem(i: number) {
    this.cartItem.splice(i, 1)
    localStorage.setItem('cart', JSON.stringify(this.cartItem))
    this.loadCart()
  }
  AddOrder() { 
    if (this.validation()) {
      this.IsLoading = true;
      this._http.post(CONSTANT.API_URL + 'api/Order/AddOrder', this.order, { headers: this._global.headers }).subscribe((res: any) => {
        if (res.includes('Success')) {
          this.IsLoading = false;
          this.order = new Order();
          localStorage.removeItem('cart')
          this.total()[0].qty = 0;
          this.total()[0].discount = 0;
          this.total()[0].amount = 0;
          this.total()[0].total = 0;
          this._router.navigate(['order-complete', { orderno: res.split('|')[0] }]);
        }
      })
    }
  }
  validation() {
    this.message.set('')
    if (this.order.name == '') {
      this.message.set('please provide name')
      return false;
    }
    if (this.order.contactNo == '') {
      this.message.set('please provide contact no')
      return false;
    }
    if (this.order.email == '') {
      this.message.set('please provide email')
      return false;
    }
    if (this.order.address == '') {
      this.message.set('please provide address')
      return false;
    }
    return true;
  }
}
