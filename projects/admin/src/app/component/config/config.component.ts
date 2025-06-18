import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { HttpClient } from '@angular/common/http';
import { constant } from '../../model/constent';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-config',
  imports: [CommonModule, FormsModule],
  templateUrl: './config.component.html',
  styleUrl: './config.component.css'
})
export class ConfigComponent implements OnInit {
  isLoading: boolean = false;
  shipping: number = 0;
  _http = inject(HttpClient)
  global = inject(GlobalService)
  ngOnInit(): void {
    this.GetShipping()
  }
  GetShipping() {
    this._http.get(constant.API_URL + 'api/Config/Get').subscribe((res: any) => {
      this.shipping = res.shipping;
    })
  }
  Add() {
    this._http.post(constant.API_URL + 'api/Config/AddShipping', this.shipping, { headers: this.global.headers }).subscribe((res: any) => {
      alert(res)
    });
  }
}
