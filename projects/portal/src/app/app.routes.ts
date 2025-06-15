import { Routes } from '@angular/router';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ContactComponent } from './component/contact/contact.component';
import { EnquiryComponent } from './component/enquiry/enquiry.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { IndexComponent } from './component/index/index.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderCompleteComponent } from './component/order-complete/order-complete.component';
import { TestComponent } from './component/test/test.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'order-complete', component: OrderCompleteComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'test', component: TestComponent },
    { path: 'enquiry', component: EnquiryComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: NotFoundComponent }
];
