import { Component, OnInit } from '@angular/core';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Location } from '@angular/common';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from '../../base/base/base.component';
@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent extends BaseComponent implements OnInit {
  title: string= "Vendor Edit";
  vendor: Vendor =new Vendor();
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
    this.route.params.subscribe(parms=> this.id=parms['id']);
    this.vendorSvc.get(this.id).subscribe(jr => {
      this.vendor =jr.data as Vendor;
  });
}

save(): void{
  this.vendorSvc.save(this.vendor).subscribe(jr => {
   console.log("edited vendor...");
    console.log(this.vendor);
    this.router.navigateByUrl("/vendors/list")
  });

}

backClicked(){
  this.loc.back();

}

}
