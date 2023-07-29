import { Component, OnInit, ViewChild} from '@angular/core';
import { ListPhotoService } from 'src/app/services/list-photo-service/list-photo-service';
import { Photo } from 'src/app/models/photoModels';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from '../image-modal/image-modal.component';


@Component({
  selector: 'app-list-photo',
  templateUrl: './list-photo.component.html',
  styleUrls: ['./list-photo.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: MatTableDataSource<Photo> = new MatTableDataSource<Photo>([]);
  displayedColumns: string[] = ['albumId', 'id', 'title', 'url'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listPhotoService: ListPhotoService,public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.photos.paginator = this.paginator;
    this.photos.sort = this.sort;
  }

  ngOnInit() {
    this.listPhotoService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos.data = photos;
    });
  }

  albumIdFilter = '';
  idFilter = '';
  titleFilter = '';

  applyFilter(event: Event, property: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (property === 'albumId') {
      this.albumIdFilter = filterValue;
    } else if (property === 'id') {
      this.idFilter = filterValue;
    } else if (property === 'title') {
      this.titleFilter = filterValue;
    }

    this.filterTable();
  }

  filterTable() {
    this.photos.filterPredicate = (data: Photo) => {
      const albumIdMatch = !this.albumIdFilter || data.albumId.toString() === this.albumIdFilter;
      const idMatch = !this.idFilter || data.id.toString() === this.idFilter;
      const titleMatch = !this.titleFilter || data.title.toLowerCase().includes(this.titleFilter);

      return albumIdMatch && idMatch && titleMatch;
    };

    this.photos.filter = 'triggerFilter';
    this.photos.paginator?.firstPage();
  }

  openImageDialog(imageUrl: string) {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
      panelClass: 'custom-dialog-container'
    });
  }
}
