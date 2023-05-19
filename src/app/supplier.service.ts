import { Supplier } from './supplier';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  url = 'http://localhost:3007/supplier';
  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.url);
  }

  save(supplier: Supplier): Observable<Supplier>{
    return this.http.post<Supplier>(this.url, supplier);
  }

  update(supplier: Supplier): Observable<Supplier>{
    return this.http.put<Supplier>(`${this.url}/${supplier.id}`, supplier);
  }

  delete(supplier: Supplier): Observable<void>{
    return this.http.delete<void>(`${this.url}/${supplier.id}`);
  }
}
