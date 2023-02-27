import { Injectable } from '@angular/core';
import { Menu } from '../shared/menu';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
@Injectable({
  providedIn: 'root',
})
export class CrudService {
  menusRef: AngularFireList<any>;
 menuRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  // Create Student
  AddMenu(menu: Menu) {
    this.menusRef.push({
      menuItem: menu.menuItem,
      menuDesc: menu.menuDesc,
      subMenu: menu.subMenu,
      subMenuDesc: menu.subMenuDesc,
    });
  }
  // Fetch Single Student Object
  GetMenu(id: string) {
    this.menuRef = this.db.object('menu-list/' + id);
    return this.menuRef;
  }
  // Fetch Students List
  GetMenuList() {
    this.menusRef = this.db.list('menu-list');
    return this.menusRef;
  }
  // Update Student Object
  UpdateMenu(menu: Menu) {
    this.menuRef.update({
      menuItem: menu.menuItem,
      menuDesc: menu.menuDesc,
      subMenu: menu.subMenu,
      subMenuDesc: menu.subMenuDesc,
    });
  }
  // Delete Student Object
  DeleteMenu(id: string) {
    this.menuRef = this.db.object('menu-list/' + id);
    this.menuRef.remove();
  }
}


