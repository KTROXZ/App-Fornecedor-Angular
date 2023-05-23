import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  formGroupClient: FormGroup;
  clients: Client[] = [];
  genderOptions: string[] = ['Masculino', 'Feminino'];
  isEditing = false;
  submitted: boolean = false;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupClient = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      requestDate: [''],
    });
  }

  ngOnInit(): void{
    this.loadClients();
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (data) => (this.clients = data),
    });
  }

  save(){
    this.submitted = true;
    if(this.formGroupClient.valid){
      if (this.isEditing) {
        this.clientService.update(this.formGroupClient.value).subscribe({
          next: () => {
            this.loadClients();
            this.formGroupClient.reset();
            this.isEditing = false;
            this.submitted = false;
          }
        });
      } else {
        this.clientService.save(this.formGroupClient.value).subscribe({
          next: data => {
            this.clients.push(data)
            this.formGroupClient.reset();
            this.submitted = false;
          }
         });
      }
    }
  }

  clean(){
    this.formGroupClient.reset();
    this.isEditing = false;
    this.submitted = false;
  }

  edit(client: Client) {
    this.formGroupClient.patchValue(client);
    this.isEditing = true;
  }

  remove(client: Client) {
    this.clientService.delete(client).subscribe({
      next: () => this.loadClients(),
    });
  }

  toggleCompleted(client: Client){
    client.completed = !client.completed;
    this.clientService.update(client).subscribe(() => {
      this.loadClients();
    });
  }

  get name() : any {
    return this.formGroupClient.get("name");
  }

  get gender() : any {
    return this.formGroupClient.get("gender");
  }

  get email() : any {
    return this.formGroupClient.get("email");
  }

  get address() : any {
    return this.formGroupClient.get("address");
  }

  get phone() : any {
    return this.formGroupClient.get("phone");
  }
}
