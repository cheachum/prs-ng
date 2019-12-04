import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { ProductService } from 'src/app/service/product.service';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  title: string = "Product Detail";
  product: Product = new Product();
  vendors: Vendor[] = [];
  id: number = 0;
  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {this.route.params.subscribe(parms => this.id=parms['id']);
  this.productSvc.get(this.id).subscribe(jr => {
    this.product = jr.data as Product;
    console.log("Product to edit: ", this.product);
  });
  this.vendorSvc.list().subscribe(jr => {
    this.vendors = jr.data as Vendor[];
    console.log("vendors", this.vendors);
  });
  }
  save(): void {
    this.productSvc.save(this.product).subscribe(jr => {
      console.log("saved product...");
      console.log(this.product);
      this.router.navigateByUrl("/products/list")
    });
  }

}
