import { Component, OnInit } from '@angular/core';
import { SystemService } from 'src/app/service/system.service';
import { RequestService } from 'src/app/service/request.service';
import { BaseComponent } from '../../base/base/base.component';

@Component({
  selector: 'app-request-review',
  templateUrl: './request-review.component.html',
  styleUrls: ['./request-review.component.css']
})
export class RequestReviewComponent extends BaseComponent implements OnInit {
  title: string = "Request Review";
  requests: Request[] = [];
  constructor(protected sysSvc: SystemService,
    private requestsvc: RequestService ) {
    super(sysSvc);
  }

  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    console.log("Calling request review service list..");
    this.requestsvc.requestForReview(this.loggedInUser.id).subscribe(jr => {
      this.requests = jr.data as Request[];
      console.log(this.requests);
    });
  }
  
}
