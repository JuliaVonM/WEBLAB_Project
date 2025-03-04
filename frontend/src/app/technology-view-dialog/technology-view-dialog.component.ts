import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {DatePipe} from '@angular/common';
import {Technology} from '../interfaces/technology';
import {Category} from '../interfaces/category';
import {Ring} from '../interfaces/ring';

@Component({
  selector: 'app-technology-view-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    DatePipe
  ],
  templateUrl: './technology-view-dialog.component.html',
  styleUrl: './technology-view-dialog.component.css'
})
export class TechnologyViewDialogComponent {

  technology: Technology;
  categories: Category[];
  rings: Ring[];
  isAdmin: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.technology = data.technology;
    this.categories = data.categories;
    this.rings = data.rings;
    this.isAdmin = data.isAdmin;
  }

  getCategoryName(category: string | undefined) {
    const foundCategory = this.categories.find(c => c._id === category);
    return foundCategory ? foundCategory.name : "";
  }

  getRingName(ring: string | undefined) {
    const foundRing =  this.rings.find(c => c._id === ring);
    return foundRing ? foundRing.name : "";
  }
}
