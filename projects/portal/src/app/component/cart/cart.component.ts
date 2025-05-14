import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
import { Product } from '../../../../../admin/src/app/model/Product';
import { CONSTANT } from '../../models/constant';
import { single } from 'rxjs';
import { Order } from '../../models/order';
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
  totalAmount = signal(0)
  cartItem: Product[] = [];
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  _router = inject(Router);
  constructor() { }
  ngOnInit(): void {
    this.loadCart()
  }
  getImageUrl(file: []) {
    return CONSTANT.API_URL + 'Resource/Product/' + file.at(0);
  }
  loadCart() {
    if (!localStorage.hasOwnProperty('cart')) {
      this.totalAmount.set(0)
      return
    }

    this.cartItem = JSON.parse(localStorage.getItem('cart') || '');
    if (this.cartItem.length > 0)
      this.totalAmount.set(this.cartItem.map(i => Number(i.price)).reduce((a, b) => a + b));
    else
    this.totalAmount.set(0)
  }
  removeItem(i: number) {
    this.cartItem.splice(i, 1)
    localStorage.setItem('cart', JSON.stringify(this.cartItem))
    this.loadCart()
  }
  AddOrder() {
    if (this.validation()) {
      this.order.productId = Object.assign([...this.cartItem.map(i => i.productId)]);
      this.IsLoading = true;
      this._http.post(CONSTANT.API_URL + 'api/Order/AddOrder', this.order, { headers: this._global.headers }).subscribe((res: any) => {
        if (res.includes('Success')) {
          this.IsLoading = false;
          this.order = new Order();
          localStorage.removeItem('cart')
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
    if (this.order.address == '') {
      this.message.set('please provide address')
      return false;
    }
    return true;
  }
}
