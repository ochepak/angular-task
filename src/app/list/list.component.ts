import {Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ViewChild, ViewContainerRef} from '@angular/core';
import { OnInit, OnDestroy } from '@angular/core';
import {UsersService} from './users.service';
import {PopupComponent} from './popup/popup.component';
import {User} from '../models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  private usersList: Array<User>;
  private pageSize = 10;
  private activeItems: Array<User>;
  private pages = [];
  private currentPage: number;
  @ViewChild('modalContainer', { read: ViewContainerRef }) container;
  componentRef: ComponentRef<PopupComponent>;

  constructor(private userServise: UsersService, private resolver: ComponentFactoryResolver) { }

  createComponent(user: User) {
    this.container.clear();
    const factory: ComponentFactory<PopupComponent> = this.resolver.resolveComponentFactory(PopupComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.user = user;
  }

  ngOnInit() {
    this.userServise.getUsers()
      .subscribe((users: Array<User>) => {
        this.usersList = users;
        this.pages = Array(Math.ceil(this.usersList.length / this.pageSize));
        this.setPage(1);
      });
  }

  setPage(num: number) {
    this.currentPage = num;
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    if (this.currentPage > this.pages.length) {
      this.currentPage = this.pages.length;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize - 1, this.usersList.length - 1);

    this.activeItems = [];

    for (let i = startIndex; i <= endIndex; i++) {
      this.activeItems.push(this.usersList[i]);
    }
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }
}
