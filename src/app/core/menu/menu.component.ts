import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/model/menu-item.class';
import { SystemService } from 'src/app/service/system.service';
import { BaseComponent } from 'src/app/feature/base/base/base.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent extends BaseComponent implements OnInit {
  menuItems: MenuItem[] = [];

  constructor(protected sysSvc: SystemService) {
    super(sysSvc);
   }

  ngOnInit() {
    super.ngOnInit();
    this.sysSvc.checkLogin();
    this.menuItems= [
      new MenuItem("User", "/users/list", "Users List"),
      new MenuItem("Vendor", "/vendors/list", "Users List"),
      new MenuItem("Product", "/products/list", "Products List"),
      new MenuItem("Request", "/requests/list", "Requests List"),
      //new MenuItem("Review", "/requests/review", "Reviews List"),
      //new MenuItem("Login", "/users/login", "Login"),
    ];
    if (this.sysSvc.isReviewer()) {
      this.menuItems.push(new MenuItem("Review", "/requests/review", "Reviews List"));
    }
    this.menuItems.push(new MenuItem("Login", "/users/login", "Login"));
  }

}