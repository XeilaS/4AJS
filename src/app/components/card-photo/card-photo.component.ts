import { Component, OnInit, ViewChild } from '@angular/core';
import { ListPhotoService } from 'src/app/services/list-photo-service/list-photo-service';
import { Photo } from 'src/app/models/photoModels';
import { MatDialog } from '@angular/material/dialog';
import { ImageModalComponent } from 'src/app/components/image-modal/image-modal.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-card-photo',
  templateUrl: './card-photo.component.html',
  styleUrls: ['./card-photo.component.css']
})
export class CardPhotoComponent implements OnInit {
  photos: Photo[] = [];
  totalItems = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25];
  visiblePhotos: Photo[] = [];
  currentFilterValue = '';

  constructor(private listPhotoService: ListPhotoService,public dialog: MatDialog) { }

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

  applyFilter(event: Event, property: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.currentFilterValue = filterValue;
    
    if (property === 'id') {
      const filterId = parseInt(filterValue, 10);
      if (isNaN(filterId)) {
        // Si le filtre ID n'est pas un nombre valide, réinitialiser la liste visiblePhotos à la liste complète des photos
        this.visiblePhotos = this.photos;
      } else {
        this.visiblePhotos = this.photos.filter(photo => photo.id === filterId);
      }
    } else if (property === 'title') {
      this.visiblePhotos = this.photos.filter(photo => photo.title.toLowerCase().includes(filterValue));
    }
  
    if (this.visiblePhotos.length === 0) {
      const noDataMessage = `Rien n'a été trouvé avec le filtre "${filterValue}"`;
      this.visiblePhotos.push({ albumId: -1, id: -1, title: noDataMessage, url: '', thumbnailUrl: '' });
    }
  
    // Reset pagination
    this.paginator.firstPage();
  }
}
