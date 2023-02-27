import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../shared/crud.service';
import { Menu } from '../shared/menu';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit {

  p: number = 1;
  menu: Menu[];
  hideWhenNomenu: boolean = false;
  noData: boolean = false;
  preLoader: boolean = true;
  
  constructor(
    public crudApi: CrudService,
    public toastr: ToastrService
    ){ }

  ngOnInit() {
    this.dataState();
    let s = this.crudApi.GetMenuList(); 
    s.snapshotChanges().subscribe(data => {
      this.menu = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.menu.push(a as Menu);
      })
    })
  }
  dataState() {     
    this.crudApi.GetMenuList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if(data.length <= 0){
        this.hideWhenNomenu = false;
        this.noData = true;
      } else {
        this.hideWhenNomenu = true;
        this.noData = false;
      }
    })
  }
  deletemenu(menu) {
    if (window.confirm('Are sure you want to delete this menu ?')) { 
      this.crudApi.DeleteMenu(menu.$key)
      this.toastr.success(menu.firstName + ' successfully deleted!');
    }
  }
}