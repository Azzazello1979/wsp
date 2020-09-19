import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

/* services */
import { UserService } from 'src/app/services/user.service';
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { UserGuardService } from 'src/app/services/user-guard.service';

/* components */
import { AppComponent } from 'src/app/app.component';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { NotfoundPageComponent } from 'src/app/components/pages/notfound-page/notfound-page.component';
import { LoginPageFormComponent } from './components/non-portable/login-page-form/login-page-form.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { ProductsPageComponent } from './components/pages/products-page/products-page.component';
import { WishlistPageComponent } from './components/pages/wishlist-page/wishlist-page.component';
import { SettingsforuserPageComponent } from './components/pages/settingsforuser-page/settingsforuser-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { ManageUsersPageComponent } from './components/pages/manage-users-page/manage-users-page.component';
import { ManageProductsPageComponent } from './components/pages/manage-products-page/manage-products-page.component';
import { ManageOrdersPageComponent } from './components/pages/manage-orders-page/manage-orders-page.component';
import { ListOrdersPageComponent } from './components/pages/list-orders-page/list-orders-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardPageComponent,
    NotfoundPageComponent,
    LoginPageFormComponent,
    HomePageComponent,
    ProductsPageComponent,
    WishlistPageComponent,
    SettingsforuserPageComponent,
    CartPageComponent,
    ManageUsersPageComponent,
    ManageProductsPageComponent,
    ManageOrdersPageComponent,
    ListOrdersPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
  ],
  providers: [
    UserService,
    UserGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
