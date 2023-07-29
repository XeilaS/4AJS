import { Component, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Album } from 'src/app/models/albumModels';
import { ListAlbumService } from 'src/app/services/list-album-service/list-album.service';

@Component({
  selector: 'app-list-album',
  templateUrl: './list-album.component.html',
  styleUrls: ['./list-album.component.css']
})
export class ListAlbumComponent {
  albums: MatTableDataSource<Album> = new MatTableDataSource<Album>([]);
  displayedColumns: string[] = ['userId', 'id', 'title'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listAlbumService: ListAlbumService) { }

  ngAfterViewInit() {
    this.albums.paginator = this.paginator;
    this.albums.sort = this.sort;
  }

  ngOnInit() {
    this.listAlbumService.getAlbums().subscribe((albums: Album[]) => {
      this.albums.data = albums;
    });
  }

  userIdFilter = '';
  idFilter = '';
  titleFilter = '';

  applyFilter(event: Event, property: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (property === 'userId') {
      this.userIdFilter = filterValue;
    } else if (property === 'id') {
      this.idFilter = filterValue;
    } else if (property === 'title') {
      this.titleFilter = filterValue;
    }

    this.filterTable();
  }

  filterTable() {
    this.albums.filterPredicate = (data: Album) => {
      const userIdMatch = !this.userIdFilter || data.userId.toString() === this.userIdFilter;
      const idMatch = !this.idFilter || data.id.toString() === this.idFilter;
      const titleMatch = !this.titleFilter || data.title.toLowerCase().includes(this.titleFilter);

      return userIdMatch && idMatch && titleMatch;
    };

    this.albums.filter = 'triggerFilter';
    this.albums.paginator?.firstPage();
  }
}

