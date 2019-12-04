import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base/base/base.component';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent extends BaseComponent implements OnInit {
  title: string= "Requests";
  requests: Request [] =[];
  constructor(private requestSvc: RequestService) {
    super();
  }

  ngOnInit() {
    console.log("Calling requests..");
    this.requestSvc.list().subscribe(jr=> {
      console.log("jr:", jr);
      this.requests =jr.data as Request[];
      console.log("requests", this.requests);
        });

  }

}
