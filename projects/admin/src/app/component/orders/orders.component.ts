import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { constant } from '../../model/constent';
import { IorderItem, IOrders } from '../../model/orders';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IProduct } from '../../model/IProduct';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {
  orderList: IOrders[] = [];
  orderInfo={} as IOrders;
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {
    this.GetOrders();
  }
  exportToExcel(jsonData: any[], fileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}.xlsx`);
  }
  getImgUrl(file: []) {
    return constant.API_URL + 'Resource/Product/' + file.at(0);
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
  OrderInfo(order: IOrders) {
    this.orderInfo = order;
  }
}
