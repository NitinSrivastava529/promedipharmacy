import { CommonModule, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GlobalService } from '../../services/global.service';
@Component({
  selector: 'app-header',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  global=inject(GlobalService)
  cartCount=this.global.cartCount;  
}
