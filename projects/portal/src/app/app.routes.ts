import { Routes } from '@angular/router';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ContactComponent } from './component/contact/contact.component';
import { EnquiryComponent } from './component/enquiry/enquiry.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDetailsComponent } from './component/product-details/product-details.component';
import { IndexComponent } from './component/index/index.component';
import { GalleryComponent } from './component/gallery/gallery.component';

export const routes: Routes = [
    { path: '', redirectTo: 'index', pathMatch: 'full' },
    { path: 'index', component: IndexComponent },
    { path: 'product', component: ProductComponent },
    { path: 'product-details/:id', component: ProductDetailsComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'enquiry', component: EnquiryComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: NotFoundComponent }
];
