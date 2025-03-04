import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource
} from '@angular/material/table';
import {MatChip} from '@angular/material/chips';
import {MatIcon} from '@angular/material/icon';
import {NgClass, NgIf} from '@angular/common';
import {Technology} from '../interfaces/technology';
import {Category} from '../interfaces/category';
import {Ring} from '../interfaces/ring';
import {TechnologyService} from '../services/technology.service';
import {CategoryService} from '../services/category.service';
import {RingService} from '../services/ring.service';
import {MatDialog} from '@angular/material/dialog';
import {PublishDialogComponent} from '../publish-dialog/publish-dialog.component';
import {
  TechnologyFormDialogComponent
} from '../technology-form-dialog/technology-form-dialog.component';
import {MatTooltip} from '@angular/material/tooltip';
import {MatSort, MatSortHeader} from '@angular/material/sort';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {
  TechnologyViewDialogComponent
} from '../technology-view-dialog/technology-view-dialog.component';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-technology-table',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatTable,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatChip,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatCardTitle,
    NgIf,
    NgClass,
    MatTooltip,
    MatSort,
    MatSortHeader,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './technology-table.component.html',
  styleUrl: './technology-table.component.css'
})
export class TechnologyTableComponent implements OnInit, AfterViewInit, OnChanges {

  @ViewChild(MatSort) sort!: MatSort;

  @Input('card-name') cardName: string = "Technology list";
  @Input() isAdmin: boolean = true;
  @Input() technologies!: Technology[];

  @Output() updateTechnologies = new EventEmitter();

  categories = new Array<Category>();
  rings = new Array<Ring>();
  filteredTechnologies = new MatTableDataSource<Technology>([]);

  readonly adminColumns: string[] = ['name', 'category', 'ring', 'details', 'published', 'actions'];
  readonly viewerColumns: string[] = ['name', 'category', 'ring', 'details'];
  displayedColumns: string[] = this.adminColumns;

  activeFilter: string = 'all';

  ringOrder = new Map<string, number>([
    ['Adopt', 1],
    ['Trial', 2],
    ['Assess', 3],
    ['Hold', 4]
  ]);

  constructor(
    private dialog: MatDialog,
    private techService: TechnologyService,
    private categoryService: CategoryService,
    private ringService: RingService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.loadRings();
    this.loadCategories();

    if (!this.isAdmin) {
      this.displayedColumns = this.viewerColumns;
    }

    this.filterTechnologies(this.activeFilter);
  }

  ngAfterViewInit() {
    this.filteredTechnologies.sort = this.sort;
    this.sort.active = 'ring';
    this.sort.direction = 'asc';

    this.filteredTechnologies.sortingDataAccessor = (item: Technology, property) => {
      switch (property) {
        case 'name':
          return item.name;
        case 'category':
          return this.getCategoryName(item.category);
        case 'ring':
          return this.ringOrder.get(this.getRingName(item.ring))!;
        case 'published':
          return item.published ? '1' : '0';
        default:
          return '';
      }
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['technologies']) {
      this.filterTechnologies(this.activeFilter);
    }
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadRings() {
    this.ringService.getRings().subscribe(rings => {
      this.rings = rings;
    });
  }

  filterTechnologies(status: string): void {
    this.activeFilter = status;

    if (status === 'all') {
      this.filteredTechnologies.data = this.technologies;
    } else if (status === 'published') {
      this.filteredTechnologies.data = this.technologies.filter(tech => tech.published);
    } else {
      this.filteredTechnologies.data = this.technologies.filter(tech => !tech.published);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    const filterTextLower = filterValue.trim().toLowerCase();

    this.filteredTechnologies.data = this.technologies.filter(tech =>
      tech.name.toLowerCase().includes(filterTextLower) ||
      (tech.category && this.getCategoryName(tech.category).toLowerCase().includes(filterTextLower)) ||
      (tech.ring && this.getRingName(tech.ring).toLowerCase().includes(filterTextLower))
    );
  }

  getCategoryName(category: string | undefined) {
    const foundCategory = this.categories.find(c => c._id === category);
    return foundCategory ? foundCategory.name : "";
  }

  getRingName(ring: string | undefined) {
    const foundRing = this.rings.find(c => c._id === ring);
    return foundRing ? foundRing.name : "";
  }

  openAddTechDialog() {
    const dialogRef = this.dialog.open(TechnologyFormDialogComponent, {
      width: '800px',
      data: {
        categories: this.categories,
        rings: this.rings,
        technology: undefined,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.updateTechnologies.emit();
          this.toastr.success('Technology saved successfully.');
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  onEdit(technology: Technology): void {
    const dialogRef = this.dialog.open(TechnologyFormDialogComponent, {
      width: '800px',
      data: {
        categories: this.categories,
        rings: this.rings,
        technology: technology,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if(result) {
          this.updateTechnologies.emit();
          this.toastr.success('Technology edited successfully.');
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  onPublishPrompt(technology: Technology): void {
    const dialogRef = this.dialog.open(PublishDialogComponent, {
      width: '800px',
      data: {
        technology: technology,
        rings: this.rings,
        isEdit: false
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if(result) {
          this.updateTechnologies.emit();
          this.toastr.success('Technology published successfully.');
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  onChangeRing(technology: Technology): void {
    const dialogRef = this.dialog.open(PublishDialogComponent, {
      width: '800px',
      data: {
        technology: technology,
        rings: this.rings,
        isEdit: true
      }
    });

    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if(result) {
          this.updateTechnologies.emit();
          this.toastr.success('Ring updated successfully.');
        }
      },
      error: (err) => {
        this.toastr.error(err.message);
      }
    });
  }

  onDelete(technology: Technology): void {
    if (technology._id) {
      this.techService.deleteTechnology(technology._id).subscribe({
        next: () => {
            this.updateTechnologies.emit();
            this.toastr.success('Technology deleted successfully.');
        },
        error: (err) => {
          this.toastr.error(err.message);
        }
      });
    }
  }

  onDetails(technology: Technology) {
    this.dialog.open(TechnologyViewDialogComponent, {
      data: {
        technology: technology,
        categories: this.categories,
        rings: this.rings,
        isAdmin: this.isAdmin
      }
    });
  }
}
