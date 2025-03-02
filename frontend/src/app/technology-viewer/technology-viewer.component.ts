import {Component, OnInit} from '@angular/core';
import {TechnologyTableComponent} from '../technology-table/technology-table.component';
import {TechnologyService} from '../services/technology.service';
import {Technology} from '../interfaces/technology';
import {CategoryService} from '../services/category.service';
import {RingService} from '../services/ring.service';
import {Category} from '../interfaces/category';
import {Ring} from '../interfaces/ring';

@Component({
  selector: 'app-technology-viewer',
  imports: [
    TechnologyTableComponent
  ],
  templateUrl: './technology-viewer.component.html',
  styleUrl: './technology-viewer.component.css'
})
export class TechnologyViewerComponent implements OnInit {

  techniques: Technology[] = new Array<Technology>();
  tools: Technology[] = new Array<Technology>();
  platforms: Technology[] = new Array<Technology>();
  languagesAndFrameworks: Technology[] = new Array<Technology>();

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
    this.techService.getPublishedTechnologies().subscribe(technologies => {
      this.techniques = technologies.filter(technology => {
        return this.getCategoryName(technology.category) === 'Techniques';
      });

      this.tools = technologies.filter(technology => {
        return this.getCategoryName(technology.category) === 'Tools';
      });

      this.platforms = technologies.filter(technology => {
        return this.getCategoryName(technology.category) === 'Platform';
      });

      this.languagesAndFrameworks = technologies.filter(technology => {
        return this.getCategoryName(technology.category) === 'Languages & Frameworks';
      });

    });
  }

  loadCategories() {
    return this.categoryService.getCategories();
  }

  loadRings() {
    return this.ringService.getRings();
  }

  getCategoryName(category: string | undefined) {
    return this.categories.find(c => c._id === category)!.name;
  }
}
