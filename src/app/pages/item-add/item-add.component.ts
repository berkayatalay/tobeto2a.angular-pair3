import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BaseInputComponent } from '../../components/base-input/base-input.component';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { addItemRequest } from '../../models/addItemRequest';

@Component({
  standalone: true,
  imports: [CommonModule, BaseInputComponent, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './item-add.component.html',
  styleUrl: './item-add.component.scss'
})
export class ItemaddComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient) {}

    itemaddForm!: FormGroup;


  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.itemaddForm = this.formBuilder.group({
      id:'f211ba20-7d2a-4e45-86e2-3d123583c479',
      name: new FormControl(),
      type: new FormControl(),
      isbn: '23312',
      issn: '423234',
      category: new FormControl(),
      genre: new FormControl(),
      publicationDate: new FormControl(),
      totalPages: new FormControl(),
      language: new FormControl(),
      description: 'asdadsdas',
      isAvailable: true,
      publisherId: new FormControl(),
      locationId: new FormControl(),
    });
  }
  submit() {
    this.itemaddForm.markAsDirty();
    if (this.itemaddForm.valid) {
      console.log('tıklandı')
      this.httpClient
      .post<addItemRequest>('http://localhost:60805/api/items',this.itemaddForm.value).subscribe({
        next: (next) => {
          console.log('Backendden cevap geldi:', next);
        },
        error: (error) => {
          console.log('Backendden hatalı cevap geldi:', error);
        },
        complete: () => {
          console.log('Backend isteği sonlandı.');
        },
      });
      console.log(this.itemaddForm.value);
      console.log('tıklandı')
    }
  }
}