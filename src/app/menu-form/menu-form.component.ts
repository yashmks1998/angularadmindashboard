import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
  }

  menuName: string='';
  menuDescription: string='';
  menuItems: MenuItem[] = [];

  addMenuItem() {
    this.menuItems.push(new MenuItem());
    console.log(this.menuItems);
  }

  removeMenuItem(index: number) {
    this.menuItems.splice(index, 1);
  }
}
class MenuItem {
  name: string='';
  price: number=0;
  description: string='';
}