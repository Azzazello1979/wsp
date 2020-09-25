import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';

/* interceptors */
import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';
import { ErrorInterceptorService } from 'src/app/services/error-interceptor.service';

/* guards */
import { UserGuardService } from 'src/app/services/user-guard.service';

/* other services */
import { CentralService } from 'src/app/services/central.service';
import { UserService } from 'src/app/services/user.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';

/* components */
import { AppComponent } from 'src/app/app.component';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { NotfoundPageComponent } from 'src/app/components/pages/notfound-page/notfound-page.component';
import { LoginPageFormComponent } from 'src/app/components/non-portable/login-page-form/login-page-form.component';
import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { ProductsPageComponent } from 'src/app/components/pages/products-page/products-page.component';
import { WishlistPageComponent } from 'src/app/components/pages/wishlist-page/wishlist-page.component';
import { SettingsforuserPageComponent } from 'src/app/components/pages/settingsforuser-page/settingsforuser-page.component';
import { CartPageComponent } from 'src/app/components/pages/cart-page/cart-page.component';
import { ManageUsersPageComponent } from 'src/app/components/pages/manage-users-page/manage-users-page.component';
import { ManageProductsPageComponent } from 'src/app/components/pages/manage-products-page/manage-products-page.component';
import { ManageOrdersPageComponent } from 'src/app/components/pages/manage-orders-page/manage-orders-page.component';
import { ListOrdersPageComponent } from 'src/app/components/pages/list-orders-page/list-orders-page.component';
import { NavigationTileComponent } from 'src/app/components/portable/navigation-tile/navigation-tile.component';
import { AnimatedCardComponent } from 'src/app/components/portable/animated-card/animated-card.component';
import { FilterBarComponent } from 'src/app/components/portable/filter-bar/filter-bar.component';

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
    NavigationTileComponent,
    AnimatedCardComponent,
    FilterBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    CentralService,
    UserService,
    UserGuardService,
    ProductService,
    ProductCategoryService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
