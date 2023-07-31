import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PhotoListComponent } from './components/list-photo/list-photo.component';
import { ListPhotoService } from 'src/app/services/list-photo-service/list-photo-service';
import { MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ImageModalComponent } from './components/image-modal/image-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TabDataSelectionComponent } from './components/tab-data-selection/tab-data-selection.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ListAlbumComponent } from './components/list-album/list-album.component';
import { ListUserComponent } from './components/list-user/list-user.component';
import { ListUserService } from './services/list-user-service/list-user.service';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardPhotoComponent } from './components/card-photo/card-photo.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


@NgModule({
  declarations: [
    AppComponent,
    PhotoListComponent,
    ImageModalComponent,
    TabDataSelectionComponent,
    ListAlbumComponent,
    ListUserComponent,
    HomeComponent,
    NavbarComponent,
    CardPhotoComponent,
    ErrorPageComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,MatDialogModule ,MatTabsModule, MatButtonModule,MatCardModule
  ],
  providers: [
    ListPhotoService,
    ListUserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
