import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  _global = inject(GlobalService)
  constructor() {
    
  }

  ngOnInit(): void {
    this._global.loadScript();
  }
}
