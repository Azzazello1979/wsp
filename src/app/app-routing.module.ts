import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { NotfoundPageComponent } from 'src/app/components/pages/notfound-page/notfound-page.component';
import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { ProductsPageComponent } from 'src/app/components/pages/products-page/products-page.component';
import { WishlistPageComponent } from 'src/app/components/pages/wishlist-page/wishlist-page.component';
import { SettingsforuserPageComponent } from 'src/app/components/pages/settingsforuser-page/settingsforuser-page.component';
import { CartPageComponent } from 'src/app/components/pages/cart-page/cart-page.component';
import { ManageUsersPageComponent } from 'src/app/components/pages/manage-users-page/manage-users-page.component';
import { ManageProductsPageComponent } from 'src/app/components/pages/manage-products-page/manage-products-page.component';
import { ManageOrdersPageComponent } from 'src/app/components/pages/manage-orders-page/manage-orders-page.component';
import { ListOrdersPageComponent } from 'src/app/components/pages/list-orders-page/list-orders-page.component';

import { UserGuardService } from 'src/app/services/user-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { animationState: 'One' },
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [UserGuardService],
    data: { animationState: 'Two' },
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'products', component: ProductsPageComponent },
      { path: 'wishlist', component: WishlistPageComponent },
      { path: 'user-settings', component: SettingsforuserPageComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'list-orders', component: ListOrdersPageComponent },
      { path: 'manage-users', component: ManageUsersPageComponent },
      { path: 'manage-products', component: ManageProductsPageComponent },
      { path: 'manage-orders', component: ManageOrdersPageComponent },
    ],
  },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
