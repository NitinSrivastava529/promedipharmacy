import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANT } from '../models/constant';
import { orderItem } from '../models/order';
import { Product } from '../../../../admin/src/app/model/Product';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  baseUrl: string = window.location.origin.includes('localhost') ? 'https://localhost:5111/' : window.location.origin
  rootUrl: string = window.location.origin.includes('localhost') ? 'https://localhost:4200/' : window.location.origin
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('Accept-Control-Allow-Origin', '*')
  constructor(private http: HttpClient) { }
  post(data: any): Observable<any> {
    return this.http.post(this.baseUrl + data.url, data, { headers: this.headers });
  }
  UploadFile(url: string, data: any): Observable<any> {
    return this.http.post(CONSTANT.API_URL + url, data, { responseType: 'text' });
  }
  put(url: string, data: any): Observable<any> {
    return this.http.put(CONSTANT.API_URL + url, data, { headers: this.headers });
  }
  get(data: any): Observable<any> {
    return this.http.get(this.baseUrl + data.url, data);
  }
  calAge(dob_year: string, dob_month: string, dob_day: string) {
    debugger
    var month = (new Date().getMonth() + 1); const day = (new Date().getDate());
    const date = (new Date().getFullYear()) + '' + (month < 10) ? '0' + month : month + '' + (day < 10) ? '0' + day : day;
    const dob = (dob_year) + (dob_month) + (dob_day);
    // const age = String(parseFloat(date) - parseFloat(dob));
    // return parseInt(age.substring(2, 0));
    return 13
  }
  public loadScript() {
    const jsArray = [
      'assets/js/jquery-3.7.1.min.js',
      'assets/js/modernizr.min.js',
      'assets/js/bootstrap.bundle.min.js',
      'assets/js/imagesloaded.pkgd.min.js',
      'assets/js/jquery.magnific-popup.min.js',
      'assets/js/isotope.pkgd.min.js',
      'assets/js/jquery.appear.min.js',
      'assets/js/jquery.easing.min.js',
      'assets/js/owl.carousel.min.js',
      'assets/js/counter-up.js',
      'assets/js/jquery-ui.min.js',
      'assets/js/jquery.nice-select.min.js',
      'assets/js/countdown.min.js',
      'assets/js/flex-slider.js',
      'assets/js/wow.min.js',
      'assets/js/main.js'
    ];
    for (let i = 0; i < jsArray.length; i++) {
      let node = document.createElement('script');
      node.src = jsArray[i];
      node.type = 'text/javascript';
      node.async = false;
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }
  checkCart(productId: string) {
    if (!localStorage.hasOwnProperty('cart'))
      return

    const cart = Array.from(JSON.parse(localStorage.getItem('cart') ?? ''));
    if (cart.some((i: any) => i.itemId == productId))
      return true
    else
      return false
  }
  addToCart(product: Product) {
    let cart: orderItem[] = [];

    if (localStorage.hasOwnProperty('cart')) {
      cart = Array.from(JSON.parse(localStorage.getItem('cart') || ''));
      if (cart.some((i: any) => i.itemId == product.productId)) {
        alert('already added')
        return
      }
    }
    // if (!localStorage.hasOwnProperty('cart'))  

    cart.push({
      itemId: product.productId,
      itemName: product.productName,
      mg: product.mg,
      pack: product.qty,
      qty: 1,
      price:  product.price,
      discount:  product.discount
    });
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

