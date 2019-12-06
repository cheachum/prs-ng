import { Component, OnInit, SystemJsNgModuleLoaderConfig } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';
import { Request } from 'src/app/model/request.class';
import { SystemService } from 'src/app/service/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent implements OnInit {
  title: string = "Request Create";
  request: Request = new Request();


  constructor(private requestSvc: RequestService, 
    protected sysSvc: SystemService,
    private router: Router) { }

  ngOnInit() { 
    this.request.user = this.sysSvc.loggedInUser;
  }


  save(): void{
    console.log("save request: ",this.request);
    this.requestSvc.save(this.request).subscribe(jr => {
     console.log("saved request...");
      console.log(this.request);
      this.router.navigateByUrl("/requests/list")
    });
  }
}

