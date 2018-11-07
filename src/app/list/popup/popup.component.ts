import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user.model';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit() {
  }

}
