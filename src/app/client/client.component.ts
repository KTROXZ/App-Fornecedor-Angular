import { ClientService } from './../client.service';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  isEditing: boolean = false;
  formGroupClient: FormGroup;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: [''],
      address: [''],
      phone: [''],
      requestDate: [''],
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }
  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => (this.clients = data),
    });
  }

  save() {
    if (this.isEditing) {
      this.clientService.update(this.formGroupClient.value).subscribe({
        next: () => {
          this.loadClients();
          this.formGroupClient.reset();
          this.isEditing = false;
        }
      });
    }
    else {
      this.clientService.save(this.formGroupClient.value).subscribe({
        next: data => {
          this.clients.push(data)
          this.formGroupClient.reset();
        }
       });
    }
  }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
  }

  edit(client: Client) {
    this.formGroupClient.setValue(client);
    this.isEditing = true;
  }

  remove(client: Client) {
    this.clientService.delete(client).subscribe({
      next: () => this.loadClients(),
    });
  }
}
