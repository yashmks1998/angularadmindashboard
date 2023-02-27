import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CrudService } from '../shared/crud.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  public menuForm: FormGroup;
  constructor(
    public crudApi: CrudService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) {}
  ngOnInit() {
    this.crudApi.GetMenuList();
    this.studenForm();
  }
  studenForm() {
    this.menuForm = this.fb.group({
      menuItem: [''],
      menuDesc: [''],
      subMenu: [''],
      subMenuDesc: ['']
    });
  }
  get menuItem() {
    return this.menuForm.get('menuItem');
  }
  get menuDesc() {
    return this.menuForm.get('menuDesc');
  }
  get subMenu() {
    return this.menuForm.get('subMenu');
  }
  get subMenuDesc() {
    return this.menuForm.get('subMenuDesc');
  }
  ResetForm() {
    this.menuForm.reset();
  }
  submitMenuData() {
    this.crudApi.AddMenu(this.menuForm.value);
    this.toastr.success(
      this.menuForm.controls['menuItem'].value + ' successfully added!'
    );
    this.ResetForm();
  }
}
