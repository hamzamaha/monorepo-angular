import { OnInit } from '@angular/core';
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { UserService } from './../../../../../../libs/shared/src/lib/services/user.service';
import { Component } from '@angular/core';
import { ResOneUser, ResUser, User } from '@hcoding/shared';

@Component({
  selector: 'admin-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  users: User[] | undefined = [];
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.userService
      .getAllUsers()
      .subscribe(({ users, success }: ResUser) => (this.users = users));
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(({ success }: ResOneUser) => {
      if (success) {
        this.getCategories();
      }
    });
  }
}
