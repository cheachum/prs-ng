import { Component, OnInit } from '@angular/core';
import { LineItem } from 'src/app/model/line-item.class';
import { Product } from 'src/app/model/product.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestService } from 'src/app/service/request.service';
import { Vendor } from 'src/app/model/vendor.class';
import { Request } from 'src/app/model/request.class';

@Component({
  selector: 'app-line-item-create',
  templateUrl: './line-item-create.component.html',
  styleUrls: ['./line-item-create.component.css']
})
export class LineItemCreateComponent implements OnInit {
  title: string = "Line Item Create";
  lineItem: LineItem = new LineItem();
  products: Product[];
  request: Request = new Request();
  vendors: Vendor[];
  id: number = 0;

  constructor(private lineItemSvc: LineItemService,
    private productSvc: ProductService,
    private requestSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms['id']);
    console.log("li create request id = ",this.id);
    this.requestSvc.get(this.id).subscribe(jr => {
      console.log("request get: ",jr.data);
      this.request = jr.data as Request;
      this.lineItem.request = this.request;
    });
    this.productSvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
    });

  }
  save(): void {
    console.log("li create, li=", this.lineItem);
    this.lineItemSvc.save(this.lineItem).subscribe(jr => {
      console.log("saved line item...");
      console.log(this.lineItem);
      this.router.navigateByUrl("/requests/lines/"+this.request.id);
    
    });
  }


}



