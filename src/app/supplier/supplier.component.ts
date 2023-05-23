import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  supplier: Supplier[] = [];
  isEditing: boolean = false;
  submitted: boolean = false;
  formGroupSupplier: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      companyName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cnpj: ['', [Validators.required]],
      address: ['', [Validators.required]],
      category: ['', [Validators.required]],
      product: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
    this.formGroupSupplier.addControl('category', new FormControl(''));
  }
  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => (this.supplier = data),
    });
  }

  save() {
    this.submitted = true;
    if (this.formGroupSupplier.valid){
      if (this.isEditing) {
        this.supplierService.update(this.formGroupSupplier.value).subscribe({
          next: () => {
            this.loadSuppliers();
            this.formGroupSupplier.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      } else {
        const newSupplier: Supplier = {
          ...this.formGroupSupplier.value,
          completed: false
        };
        this.supplierService.save(newSupplier).subscribe({
          next: () => {
            this.loadSuppliers();
            this.formGroupSupplier.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      }
    }
  }

  clean(){
    this.formGroupSupplier.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(supplier: Supplier) {
    this.formGroupSupplier.patchValue(supplier);
    this.isEditing = true;
  }

  remove(supplier: Supplier) {
    this.supplierService.delete(supplier).subscribe({
      next: () => this.loadSuppliers(),
    });
  }


  get companyName() : any {
    return this.formGroupSupplier.get("companyName");
  }


  get phone() : any {
    return this.formGroupSupplier.get("phone");
  }

  get cnpj() : any {
    return this.formGroupSupplier.get("cnpj");
  }

  get address() : any {
    return this.formGroupSupplier.get("address");
  }

  get category() : any {
    return this.formGroupSupplier.get("category");
  }

  get product() : any {
    return this.formGroupSupplier.get("product");
  }
}
