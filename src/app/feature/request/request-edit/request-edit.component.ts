import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.class';
import { Request } from 'src/app/model/request.class';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent implements OnInit {
  title: string = " Request Edit";
  request: Request = new Request();
  users: User[]=[];
  id: number = 0;

  constructor(private requestSvc: RequestService,
    private userSvc: UserService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() { this.route.params.subscribe(parms => this.id=parms['id']);
  this.requestSvc.get(this.id).subscribe(jr => {
    this.request = jr.data as Request;
    console.log("Request to edit: ", this.request);
  });
  
  this.userSvc.list().subscribe(jr => {
    this.users = jr.data as User[];
    console.log("users", this.users);
  });
  }
  save(): void {
    this.requestSvc.save(this.request).subscribe(jr => {
      console.log("saved request...");
      console.log(this.request);
      this.router.navigateByUrl("/requests/list")
    });

  }
      compUser(a:User, b: User): boolean {
        return a && b && a.id === b.id;
      };

}
