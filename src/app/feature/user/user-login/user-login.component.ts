import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { SystemService } from 'src/app/service/system.service';
import { Router } from '@angular/router';
import { BaseComponent } from '../../base/base/base.component';
import { User } from 'src/app/model/user.class';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent extends BaseComponent implements OnInit {
  message: string ="";
  user: User = new User();

  constructor(private userSvc: UserService,
    protected sysSvc: SystemService,
    private router: Router) {
      super(sysSvc);
     }

  ngOnInit() {
  }

}
