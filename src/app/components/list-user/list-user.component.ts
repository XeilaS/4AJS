import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/userModels';
import { ListUserService } from 'src/app/services/list-user-service/list-user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  users: MatTableDataSource<User> = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['id', 'name', 'username','detailUser'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listUserService: ListUserService,public dialog: MatDialog) { }

  ngAfterViewInit() {
    this.users.paginator = this.paginator;
    this.users.sort = this.sort;
  }

  ngOnInit() {
    this.listUserService.getUsers().subscribe((users: User[]) => {
      this.users.data = users;
    });
  }

  idFilter = '';
  nameFilter = '';
  usernameFilter = '';

  applyFilter(event: Event, property: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (property === 'id') {
      this.idFilter = filterValue;
    } else if (property === 'name') {
      this.nameFilter = filterValue;
    } else if (property === 'username') {
      this.usernameFilter = filterValue;
    }

    this.filterTable();
  }

  filterTable() {
    this.users.filterPredicate = (data: User) => {
      const idMatch  = !this.idFilter || data.id.toString() === this.idFilter;
      const nameMatch = !this.nameFilter || data.name.toLowerCase().includes(this.nameFilter);
      const usernameMatch = !this.usernameFilter || data.username.toLowerCase().includes(this.usernameFilter);

      return idMatch && nameMatch && usernameMatch;
    };

    this.users.filter = 'triggerFilter';
    this.users.paginator?.firstPage();
  }
}
