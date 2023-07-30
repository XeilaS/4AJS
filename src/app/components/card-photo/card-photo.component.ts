import { Component, OnInit, ViewChild } from '@angular/core';
import { Photo } from 'src/app/models/photoModels';
import { ListPhotoService } from 'src/app/services/list-photo-service/list-photo-service';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-photo',
  templateUrl: './card-photo.component.html',
  styleUrls: ['./card-photo.component.css']
})
export class CardPhotoComponent implements OnInit {
  photos: Photo[] = [];
  totalItems = 0;
  pageSize= 10;
  pageSizeOptions: number[] = [10, 15, 25];
  visiblePhotos: Photo[] = [];

  constructor(private listPhotoService: ListPhotoService, public dialog: MatDialog) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.listPhotoService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos = photos;
      this.totalItems = this.photos.length;
      this.onPageChange({ pageIndex: 0, pageSize: this.pageSize, length: this.totalItems });
    });
  }

  onPageChange(event: PageEvent) {
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;
    const startIndex = pageIndex * pageSize;
    this.visiblePhotos = this.photos.slice(startIndex, startIndex + pageSize);
  }

  openImageDialog(imageUrl: string) {
    this.dialog.open(ImageModalComponent, {
      data: { imageUrl },
      panelClass: 'custom-dialog-container'
    });
  }
}
