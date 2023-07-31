import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabDataSelectionComponent } from './components/tab-data-selection/tab-data-selection.component';
import { HomeComponent } from './components/home/home.component';
import { CardPhotoComponent } from './components/card-photo/card-photo.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';

const routes: Routes = [
{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: 'home', component: HomeComponent },
{ path: 'dataTable', component: TabDataSelectionComponent},
{ path: 'user-details/:userId', component: UserDetailsComponent },
{ path: 'dataCard', component: CardPhotoComponent},
{ path: '', redirectTo: 'page-introuvable', pathMatch: 'full' },
{ path: 'page-introuvable', component: ErrorPageComponent },
{ path: '**', redirectTo: 'page-introuvable' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
