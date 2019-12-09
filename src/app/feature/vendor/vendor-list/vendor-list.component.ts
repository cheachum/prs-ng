import { Component, OnInit } from '@angular/core';
import { JsonResponse } from 'src/app/model/json-response';
import { Vendor } from 'src/app/model/vendor.class';
import { VendorService } from 'src/app/service/vendor.service';
import { BaseComponent } from '../../base/base/base.component';
import { SystemService } from 'src/app/service/system.service';
@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent extends BaseComponent implements OnInit {
title: string = "Vendor List";
vendors : Vendor []=[];
jr: JsonResponse;
  constructor(private vendorSvc: VendorService,
    protected sysSvc: SystemService) {
    super(sysSvc);
   }
  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    console.log("Calling vendor service list...");
    this.vendorSvc.list().subscribe(jresp => {
    this.jr =jresp;
    this.vendors =this.jr.data as Vendor[];
    console.log(this.vendors);
  });
  }
}