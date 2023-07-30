import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabDataSelectionComponent } from './components/tab-data-selection/tab-data-selection.component';

const routes: Routes = [{ 
  path: '', redirectTo: '/home', pathMatch: 'full' },
//{ path: 'home', component: HomeComponent },
{ path: 'dataTable', component: TabDataSelectionComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
