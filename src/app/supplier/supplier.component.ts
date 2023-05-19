import { SupplierService } from './../supplier.service';
import { Component, OnInit } from '@angular/core';
import { Supplier } from '../supplier';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  supplier: Supplier[] = [];
  isEditing: boolean = false;
  formGroupSupplier: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupSupplier = formBuilder.group({
      id: [''],
      companyName: [''],
      phone: [''],
      cnpj: [''],
      address: [''],
      category: [''],
      product: [''],
    });
  }

  ngOnInit(): void {
    this.loadSuppliers();
  }
  loadSuppliers() {
    this.supplierService.getSuppliers().subscribe({
      next: (data) => (this.supplier = data),
    });
  }

  save() {
    if (this.isEditing) {
      this.supplierService.update(this.formGroupSupplier.value).subscribe({
        next: () => {
          this.loadSuppliers();
          this.formGroupSupplier.reset();
          this.isEditing = false;
        }
      });
    }
    else {
      this.supplierService.save(this.formGroupSupplier.value).subscribe({
        next: data => {
          this.supplier.push(data)
          this.formGroupSupplier.reset();
        }
       });
    }
  }

  clean(){
    this.formGroupSupplier.reset();
    this.isEditing = false;
  }

  edit(supplier: Supplier) {
    this.formGroupSupplier.setValue(supplier);
    this.isEditing = true;
  }

  remove(supplier: Supplier) {
    this.supplierService.delete(supplier).subscribe({
      next: () => this.loadSuppliers(),
    });
  }
}
