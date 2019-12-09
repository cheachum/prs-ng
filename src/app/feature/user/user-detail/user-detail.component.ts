import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent extends BaseComponent implements OnInit {
title: string = "User Detail";
user: User = new User();
id: number = 0;

  constructor(private userSvc: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private loc: Location,
              protected sysSvc: SystemService) {
                super(sysSvc)}
  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    this.route.params.subscribe(parms => this.id= parms['id']);
    this.userSvc.get(this.id).subscribe(jr =>{
      this.user = jr.data as User;
    });
  }

  delete(){
    this.userSvc.delete(this.id).subscribe(jr =>{
      this.router.navigateByUrl("users/list");
    });
  }

}
