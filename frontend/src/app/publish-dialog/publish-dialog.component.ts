import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {Technology} from '../interfaces/technology';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {TechnologyService} from '../services/technology.service';

@Component({
  selector: 'app-publish-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatInput,
    MatDialogActions,
    MatButton,
    MatLabel
  ],
  templateUrl: './publish-dialog.component.html',
  styleUrl: './publish-dialog.component.css'
})
export class PublishDialogComponent {

  technologyForm: FormGroup;

  technology: Technology;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PublishDialogComponent>,
    private techService: TechnologyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.technology = data.technology;
    this.isEdit = data.isEdit;

    this.technologyForm = this.fb.group({
      ring: [this.technology.ring, Validators.required],
      ringDescription: [this.technology.description_ring, Validators.required]
    });
  }

  onSave(): void {
    if (this.technologyForm.valid) {
      this.technology.ring = this.technologyForm.get('ring')?.value;
      this.technology.description_ring = this.technologyForm.get('ringDescription')?.value;
      this.technology.published = true;
      this.techService.updateTechnology(this.technology).subscribe(() => {
        this.dialogRef.close(this.technologyForm.value);
      })

    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
