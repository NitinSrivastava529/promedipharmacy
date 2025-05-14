import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-complete',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './order-complete.component.html',
  styleUrl: './order-complete.component.css'
})
export class OrderCompleteComponent implements OnInit {
  OrderNo: string = "";

  constructor(private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.OrderNo = this.route.snapshot.paramMap.get('orderno') ?? '';
  }
}
