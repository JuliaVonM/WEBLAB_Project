import {Component, OnInit} from '@angular/core';
import {TechnologyTableComponent} from '../technology-table/technology-table.component';
import {Technology} from '../interfaces/technology';
import {Category} from '../interfaces/category';
import {Ring} from '../interfaces/ring';
import {TechnologyService} from '../services/technology.service';
import {CategoryService} from '../services/category.service';
import {RingService} from '../services/ring.service';

@Component({
  selector: 'app-technology-admin',
  imports: [
    TechnologyTableComponent
  ],
  templateUrl: './technology-admin.component.html',
  styleUrl: './technology-admin.component.css'
})
export class TechnologyAdminComponent implements OnInit {
  technologies: Technology[] = new Array<Technology>();

  categories: Category[] = new Array<Category>();
  rings: Ring[] = new Array<Ring>();

  constructor(public techService: TechnologyService,
              public categoryService: CategoryService,
              public ringService: RingService) {

  }

  ngOnInit(): void {
    this.loadCategories().subscribe(
      categories => {
        this.categories = categories;
        this.loadRings().subscribe(
          rings => {
            this.rings = rings;
            this.loadTechnologies();
          }
        )
      }
    )
  }

  loadTechnologies() {
    this.techService.getTechnologies().subscribe(technologies => {
      console.log("admin " + technologies);

      this.technologies = technologies;
    });
  }

  loadCategories() {
    return this.categoryService.getCategories();
  }

  loadRings() {
    return this.ringService.getRings();
  }
}
