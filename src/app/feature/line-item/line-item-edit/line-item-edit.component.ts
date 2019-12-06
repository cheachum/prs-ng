import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.class'
import { LineItem } from 'src/app/model/line-item.class';
import { LineItemService } from 'src/app/service/line-item.service';
import { ProductService } from 'src/app/service/product.service';
import { SystemService } from 'src/app/service/system.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lineitem-edit',
  templateUrl: './line-item-edit.component.html',
  styleUrls: ['./line-item-edit.component.css']
})
export class LineItemEditComponent implements OnInit {
  title: string = "Line Item Edit";
  lineItem: LineItem;
  products: Product[];
  id: number = 0;

  constructor(
    private lineItemSvc: LineItemService,
    private productsvc: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    protected sysService: SystemService) {
    
  }

  save(): void {
    this.lineItemSvc.change(this.lineItem).subscribe(jr => {
      console.log("saved lineItem...");
      console.log(this.lineItem);
      this.router.navigateByUrl("/requests/lines/" + this.lineItem.request.id);
    });


  }

  ngOnInit() {
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.lineItemSvc.get(this.id).subscribe(jr => {
      this.lineItem = jr.data as LineItem;
      console.log("line items to edit: ", this.lineItem);
    });

    this.productsvc.list().subscribe(jr => {
      this.products = jr.data as Product[];
      console.log("products", this.products);
    });
  }

}