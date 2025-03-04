import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatOption} from "@angular/material/core";
import {MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Category} from '../interfaces/category';
import {Ring} from '../interfaces/ring';
import {TechnologyService} from '../services/technology.service';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Technology} from '../interfaces/technology';

@Component({
  selector: 'app-technology-form-dialog',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgForOf,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    NgIf
  ],
  templateUrl: './technology-form-dialog.component.html',
  styleUrl: './technology-form-dialog.component.css'
})
export class TechnologyFormDialogComponent {

  categories = new Array<Category>();
  rings = new Array<Ring>();
  isEdit: boolean = false;
  editingTech: Technology;

  technologyForm: FormGroup;

  constructor(private fb: FormBuilder, private techService: TechnologyService,
              public dialogRef: MatDialogRef<TechnologyFormDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    this.categories = data.categories;
    this.rings = data.rings;
    this.editingTech = data.technology;
    this.isEdit = data.isEdit;

    this.technologyForm = this.fb.group({
      name: [this.editingTech ? this.editingTech.name : '', Validators.required],
      category: [this.editingTech ? this.editingTech.category : '', Validators.required],
      description: [this.editingTech ? this.editingTech.description : '', Validators.required],
      ring: [undefined,],
      description_ring: [undefined,]
    });
  }

  onSaveDraft(): void {
    if (this.technologyForm.valid) {
      const technology = this.technologyForm.value;
      this.techService.createTechnology(technology).subscribe(() => {
        this.dialogRef.close(this.technologyForm.value);
      });
    }
  }

  onPublish(): void {
    if (this.technologyForm.valid) {
      const technology = this.technologyForm.value;
      technology.published = true;
      this.techService.createTechnology(technology).subscribe(() => {
        this.dialogRef.close(this.technologyForm.value);
      });
    }
  }

  onUpdate() {
    if (this.technologyForm.valid) {
      this.editingTech.name = this.technologyForm.get('name')?.value;
      this.editingTech.category = this.technologyForm.get('category')?.value;
      this.editingTech.description = this.technologyForm.get('description')?.value;
      this.techService.updateTechnology(this.editingTech).subscribe(() => {
        this.dialogRef.close(this.technologyForm.value);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  allFieldsSet(): boolean {
    const {name, category, description, ring, description_ring} = this.technologyForm.value;
    return !!name && !!category && !!description && !!ring && !!description_ring;
  }
}
