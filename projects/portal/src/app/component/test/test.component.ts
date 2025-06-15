import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GlobalService } from '../../services/global.service';
import { CONSTANT } from '../../models/constant';
import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-test',
  imports: [CommonModule,HammerModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit, OnDestroy {
  imgList: string[] = [];
  images: string[] = [];
  imageGroups: string[][] = [];
  currentIndex = 0;
  isAnimating = false;
  intervalId: any;
  loading = true;
  _http = inject(HttpClient)
  _global = inject(GlobalService)
  constructor() { }

  ngOnInit(): void {
    this.GetBanner()
  }
  onSwipeLeft(): void {
  this.next();
}

onSwipeRight(): void {
  this.prev();
}
  GetBanner() {
    this.loading = true;
    this._http.get(CONSTANT.API_URL + 'api/Banner/GetBanners').subscribe((res: any) => {
      this.imgList = res;
      this.images = [...this.imgList.map((i: any) => 'https://api.promedipharmacy.com/Resource/Banner/' + i.path)]
      const groupSize = this.detectGroupSize();
      this.imageGroups = this.chunkImages(this.images, groupSize);
      this.loading = false;
      this.startAutoplay();
    })
  }
  ngOnDestroy(): void {
    this.clearAutoplay();
  }

 chunkImages(arr: string[], size: number): string[][] {
  const result: string[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}
onResize(): void {
  const groupSize = this.detectGroupSize();
  this.imageGroups = this.chunkImages(this.images, groupSize);
  this.currentIndex = 0;
}
detectGroupSize(): number {
  return window.innerWidth < 768 ? 1 : 2;
}

  get transformStyle(): string {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  next(): void {
    this.animate(() => {
      this.currentIndex = (this.currentIndex + 1) % this.imageGroups.length;
    });
  }

  prev(): void {
    this.animate(() => {
      this.currentIndex =
        (this.currentIndex - 1 + this.imageGroups.length) % this.imageGroups.length;
    });
  }

  animate(callback: () => void) {
    this.clearAutoplay();
    this.isAnimating = true;

    setTimeout(() => {
      callback();
      this.isAnimating = false;
      this.startAutoplay();
    }, 300);
  }

  startAutoplay(): void {
    this.intervalId = setInterval(() => this.next(), 3000);
  }

  clearAutoplay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
