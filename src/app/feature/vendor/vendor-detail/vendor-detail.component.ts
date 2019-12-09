import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common'
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base/base.component';
import { HttpRequest } from '@angular/common/http';
@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent extends BaseComponent implements OnInit {
  title: string = "Vendor Detail";
 vendor: Vendor = new Vendor();
  id: number = 0;
  
  constructor(private vendorSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute,
    private loc: Location,
    protected sysSvc: SystemService) {
      super(sysSvc);
     }

  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    this.route.params.subscribe(parms => this.id = parms['id']);
    this.vendorSvc.get(this.id).subscribe(jr => {
      this.vendor = jr.data as Vendor;
    });
  }

  delete() {
    this.vendorSvc.delete(this.id).subscribe(jr =>{
      console.log("vendor delete jr", jr);
      if(jr.errors !=null){
        console.log("Error deleting vendors: "+jr.errors);
      }
      this.router.navigateByUrl("vendors/list");
    });
  }

}
