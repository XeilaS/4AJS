import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/userModels';
import { ListUserService } from 'src/app/services/list-user-service/list-user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;

  constructor(private location: Location,private route: ActivatedRoute, private userService: ListUserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      this.userService.getUserById(userId).subscribe(user => {
        this.user = user;
      });
    });
  }
  goBack() {
    this.location.back();
  }
}

