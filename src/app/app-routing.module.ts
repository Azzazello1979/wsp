import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from 'src/app/components/pages/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { NotfoundPageComponent } from 'src/app/components/pages/notfound-page/notfound-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'dashboard', component: DashboardPageComponent },
  { path: '**', component: NotfoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
