import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CrudService } from '../shared/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  editForm: FormGroup;
  constructor(
    private crudApi: CrudService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit() {
    this.updateMenuData();
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.crudApi
      .GetMenu(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }
  get menuItem() {
    return this.editForm.get('menuItem');
  }
  get menuDesc() {
    return this.editForm.get('menuDesc');
  }
  get subMenu() {
    return this.editForm.get('subMenu');
  }
  get subMenuDesc() {
    return this.editForm.get('subMenuDesc');
  }
  updateMenuData() {
    this.editForm = this.fb.group({
      menuItem: [''],
      menuDesc: [''],
      subMenu: [''],
      subMenuDesc: ['']
    });
  }
  goBack() {
    this.location.back();
  }
  updateForm() {
    this.crudApi.UpdateMenu(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['menuItem'].value + ' updated successfully'
    );
    this.router.navigate(['view-menu']);
  }
}