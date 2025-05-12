import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-gallery',
  imports: [],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent implements OnInit {

  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }
  ngOnInit(): void {
    this._global.loadScript();
  }
}
