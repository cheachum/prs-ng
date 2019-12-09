import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';
import { Location } from '@angular/common';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent extends BaseComponent implements OnInit {
  title: string = " Request Edit";
  request: Request = new Request();
  users: User[]=[];
  id: number = 0;

  constructor(private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute,
    protected sysSvc: SystemService,
    private loc: Location) {
      super(sysSvc);
     }

    ngOnInit() {
      super.ngOnInit();
      this.route.params.subscribe(parms => this.id=parms['id']);
    this.requestSvc.get(this.id).subscribe(jr => {
      this.request = jr.data as Request;
      console.log("Request to edit: ", this.request);
    });
    //populate list of users
    this.userSvc.list().subscribe(jr => {
      this.users = jr.data as User[];
      console.log("users", this.users);
    });

    }
  
    delete() {
      this.requestSvc.delete(this.id).subscribe(jr =>{
        //fix here to jr 
        this.router.navigateByUrl("requests/list");
      });
    }
  }
