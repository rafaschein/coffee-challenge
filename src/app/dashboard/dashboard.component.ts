import { Component, OnInit } from '@angular/core';

import * as _ from 'lodash';

import { User } from '../user';
import { UserService } from '../user.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() { 
    this.users = this.getSelecteds();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => {
      this.users = users.length < 10 ? _.chunk(this.complete(_.shuffle(users)), 10)[0] : _.chunk(_.shuffle(users), 10)[0];
      this.setLocalStorageSelecteds(this.users);
      return this.users;
    });
  }

  complete(users): User[] {
    while (users.length < 10) {
      users = _.concat(users, users);
    }

    return users;
  }

  shuffle(): void {
    this.getUsers();
  }

  print(): void {
    window.print();
  }

  getSelecteds(): any {
    let localStorageItem = JSON.parse(localStorage.getItem('selecteds'));
    return localStorageItem == null ? [] : localStorageItem.selecteds;
  }

  // private function to help save to local storage
  private setLocalStorageSelecteds(selecteds: any): void {
    localStorage.setItem('selecteds', JSON.stringify({ selecteds: selecteds }));
  }
}
