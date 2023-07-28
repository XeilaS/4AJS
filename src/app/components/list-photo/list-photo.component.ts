import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ListPhotoServiceService } from 'src/app/services/list-photo-service/list-photo-service.service';
import { Photo } from 'src/app/models/photoModels';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-photo',
  templateUrl: './list-photo.component.html',
  styleUrls: ['./list-photo.component.css']
})
export class PhotoListComponent implements OnInit {
  photos: MatTableDataSource<Photo> = new MatTableDataSource<Photo>([]);
  displayedColumns: string[] = ['albumId', 'id', 'title', 'url'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listPhotoService: ListPhotoServiceService) { }

  ngAfterViewInit() {
    this.photos.paginator = this.paginator;
    this.photos.sort = this.sort;
  }

  ngOnInit() {
    this.listPhotoService.getPhotos().subscribe((photos: Photo[]) => {
      this.photos.data = photos;
    });
  }

  albumIdFilter: string = '';
  idFilter: string = '';
  titleFilter: string = '';

  applyFilter(event: Event, property: string) {
    const filterValue = (event.target as HTMLInputElement).value;
  
    if (property === 'albumId') {
      this.albumIdFilter = filterValue.trim().toLowerCase();
    } else if (property === 'id') {
      this.idFilter = filterValue.trim().toLowerCase();
    } else if (property === 'title') {
      this.titleFilter = filterValue.trim().toLowerCase();
    }
  
    this.filterTable();
  }
  
  filterTable() {
    this.photos.filterPredicate = (data: Photo, filter: string) => {
      if (this.albumIdFilter && data.albumId.toString() === this.albumIdFilter) {
        return true;
      }
      if (this.idFilter && data.id.toString() === this.idFilter) {
        return true;
      }
      if (this.titleFilter && data.title.toLowerCase().includes(this.titleFilter)) {
        return true;
      }
      return false;
    };
  
    // Appliquer les filtres
    this.photos.filter = 'triggerFilter';
    this.photos.paginator?.firstPage();
  }
}
