import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/service/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemService } from 'src/app/service/system.service';
import { JsonResponse } from 'src/app/model/json-response';
import { BaseComponent } from '../../base/base/base.component';
import { LineItem } from 'src/app/model/line-item.class';
import { Request } from 'src/app/model/request.class';
import {LineItemService} from 'src/app/service/line-item.service';


@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent extends BaseComponent implements OnInit {
  titleOne: string = " Request Lines ";
  titleTwo: string = "Line-Items"
  request: Request = new Request;
  lineItems: LineItem[]=[];
  id: number = 0;
  jr: JsonResponse; 
 

  constructor(private lineItemSvc: LineItemService, 
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    protected sysSvc: SystemService,
    private router: Router) { 
      super(sysSvc);
    }

  ngOnInit() {
    this.sysSvc.checkLogin();
    super.ngOnInit();
    this.route.params.subscribe(parms => this.id =parms ['id']);
    this.getLineItem();
  }

    getLineItem(){
      this.requestSvc.get(this.id).subscribe(jr => {
        this.request = jr.data as Request;
      });
    

    this.route.params.subscribe(parms => this.id=parms['id']);
    this.lineItemSvc.lineForReq(this.id).subscribe(jr=>{this.lineItems=jr.data as LineItem[];
    });
    
    
    }
    delete(lineId: number){
      this.lineItemSvc.delete(lineId).subscribe(jr=> {
        this.getLineItem();
      });
    }
      submitForReview(){
        this.requestSvc.submitForReview(this.request).subscribe(jr=>{
          this.router.navigateByUrl("/requests/list")
        });
      }
      
    }
  




