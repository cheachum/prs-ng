import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product.class';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { ProductService } from 'src/app/service/product.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  title: string = "Product Detail";
  product: Product = new Product();
  vendors: Vendor[] = [];
  id: number = 0;

  constructor(private productSvc: ProductService,
    private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.params.subscribe(parms => this.id = parms['id']);
      this.productSvc.get(this.id).subscribe(jr => {
        this.product = jr.data as Product;
        console.log("Product to edit: ", this.product);
      });
      //populate list of vendors
      this.vendorSvc.list().subscribe(jr => {
        this.vendors = jr.data as Vendor[];
        console.log("vendors", this.vendors);
      });
    }

    delete () {
      this.productSvc.delete(this.id).subscribe(jr => {
        //fix here to jr 
        this.router.navigateByUrl("products/list");
      });
    }
  }

