import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { LayoutComponent } from './component/layout/layout.component';
import { OrdersComponent } from './component/orders/orders.component';
import { DashboardComponent } from './component/dashbaord/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { ProductComponent } from './component/product/product.component';
import { EnquiryComponent } from './component/enquiry/enquiry.component';
import { BannerComponent } from './component/banner/banner.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: '', component: LayoutComponent, children: [
            { path: 'dashboard', component: DashboardComponent,canActivate:[authGuard] },                      
            { path: 'products', component: ProductComponent,canActivate:[authGuard] },                 
            { path: 'orders', component: OrdersComponent,canActivate:[authGuard] },
            { path: 'enquiry', component: EnquiryComponent,canActivate:[authGuard] },                 
            { path: 'banner', component: BannerComponent,canActivate:[authGuard] }                     
        ]
    },
];
