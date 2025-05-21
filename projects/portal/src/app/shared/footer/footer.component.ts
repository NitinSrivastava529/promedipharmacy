import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {

  global=inject(GlobalService)
  constructor(){}
  ngOnInit(): void {
    this.global.loadScript();
  }
}
