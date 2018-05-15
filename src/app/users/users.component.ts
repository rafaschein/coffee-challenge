import { Component, OnInit } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

import { User } from '../user';
import { UserService } from '../user.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
    .subscribe(users => this.users = users);
  }

  add(name: string): void {
    name = name.trim().toUpperCase();
    if (!name) { return; }
    if (this.users.filter(function (item) { return item.name.toUpperCase() == name.toUpperCase(); }).length > 0) {
      this.messageService.add('UserService: Usuário já cadastrado!'); return;
    }

    this.userService.addUser({ name } as User, this.users.length)
      .subscribe(user => {
        this.users.push(user);
      });
  }

  delete(user: User): void {
    this.users = this.users.filter(h => h !== user);
    this.userService.deleteUser(user).subscribe();
  }

}